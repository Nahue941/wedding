import crypto from "node:crypto";

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

let cachedToken = null;
let cachedTokenExpiresAt = 0;

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function sanitizePrivateKey(rawKey) {
  return rawKey.replace(/\\n/g, "\n");
}

function parseBoolean(value, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }

  return fallback;
}

function toBase64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createJwtAssertion({ clientEmail, privateKey }) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_OAUTH_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = signer.sign(privateKey);
  const encodedSignature = signature
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${signingInput}.${encodedSignature}`;
}

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < cachedTokenExpiresAt) {
    return cachedToken;
  }

  const clientEmail = requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = sanitizePrivateKey(
    requiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"),
  );
  const assertion = createJwtAssertion({ clientEmail, privateKey });

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OAuth token request failed: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  cachedTokenExpiresAt = now + Math.max(0, (data.expires_in - 60) * 1000);
  return cachedToken;
}

async function sheetsRequest(pathname, init = {}) {
  const spreadsheetId = requiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${GOOGLE_SHEETS_API_BASE}/${spreadsheetId}${pathname}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Sheets API request failed: ${response.status} ${errorBody}`);
  }

  return response.json();
}

function columnNumberToA1(columnNumber) {
  let column = columnNumber;
  let label = "";

  while (column > 0) {
    const remainder = (column - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    column = Math.floor((column - 1) / 26);
  }

  return label;
}

function parseRowIndexFromA1Range(range) {
  const match = String(range ?? "").match(/![A-Z]+(\d+)(?::[A-Z]+\d+)?$/);
  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function rowsToObjects(rows) {
  if (!rows || rows.length === 0) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((cell) => String(cell).trim());

  return dataRows.map((row) => {
    const result = {};
    headers.forEach((header, index) => {
      result[header] = row[index] ?? "";
    });
    return result;
  });
}

function normalizeToken(token) {
  return String(token ?? "").trim();
}

async function readSheet(tabName) {
  const encodedRange = encodeURIComponent(`${tabName}!A:Z`);
  const data = await sheetsRequest(`/values/${encodedRange}`);
  return rowsToObjects(data.values ?? []);
}

async function appendRow(tabName, values) {
  const encodedRange = encodeURIComponent(`${tabName}!A:Z`);
  const data = await sheetsRequest(
    `/values/${encodedRange}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      body: JSON.stringify({
        values: [values],
      }),
    },
  );

  const updatedRange = data?.updates?.updatedRange ?? "";
  return {
    updatedRange,
    rowIndex: parseRowIndexFromA1Range(updatedRange),
  };
}

async function readSheetValues(tabName) {
  const encodedRange = encodeURIComponent(`${tabName}!A:Z`);
  const data = await sheetsRequest(`/values/${encodedRange}`);
  return data.values ?? [];
}

async function updateRsvpEmailTracking(rowIndex, tracking) {
  const numericRowIndex = Number(rowIndex);
  if (!Number.isInteger(numericRowIndex) || numericRowIndex < 2) {
    throw new Error("Invalid row index for RSVP tracking update.");
  }

  const values = await readSheetValues("rsvp");
  const headers = values[0] ?? [];
  const headerMap = new Map(
    headers.map((header, index) => [String(header).trim(), index + 1]),
  );

  const emailSentColumn = headerMap.get("emailSent");
  const emailSentAtColumn = headerMap.get("emailSentAt");
  const emailErrorColumn = headerMap.get("emailError");

  if (!emailSentColumn || !emailSentAtColumn || !emailErrorColumn) {
    throw new Error("Missing email tracking columns in rsvp sheet.");
  }

  const payload = {
    valueInputOption: "USER_ENTERED",
    data: [
      {
        range: `rsvp!${columnNumberToA1(emailSentColumn)}${numericRowIndex}`,
        values: [[tracking.emailSent]],
      },
      {
        range: `rsvp!${columnNumberToA1(emailSentAtColumn)}${numericRowIndex}`,
        values: [[tracking.emailSentAt]],
      },
      {
        range: `rsvp!${columnNumberToA1(emailErrorColumn)}${numericRowIndex}`,
        values: [[tracking.emailError]],
      },
    ],
  };

  await sheetsRequest("/values:batchUpdate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function getInvitationByToken(token) {
  const normalizedToken = normalizeToken(token);
  const invitations = await readSheet("invitations");

  return (
    invitations.find(
      (invitation) => normalizeToken(invitation.token) === normalizedToken,
    ) ?? null
  );
}

async function hasSubmittedRsvp(token) {
  const normalizedToken = normalizeToken(token);
  const rsvpRows = await readSheet("rsvp");
  return rsvpRows.some((row) => normalizeToken(row.token) === normalizedToken);
}

async function getConfig() {
  const configRows = await readSheet("config").catch(() => []);
  const configMap = new Map();

  for (const row of configRows) {
    const key = String(row.key ?? "").trim();
    if (!key) {
      continue;
    }

    configMap.set(key, String(row.value ?? "").trim());
  }

  return {
    rsvpEnabled: parseBoolean(configMap.get("rsvpEnabled"), true),
    dedupeByToken: parseBoolean(configMap.get("dedupeByToken"), true),
  };
}

export {
  appendRow,
  getConfig,
  getInvitationByToken,
  hasSubmittedRsvp,
  normalizeToken,
  parseBoolean,
  updateRsvpEmailTracking,
};
