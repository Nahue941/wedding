import {
  appendRow,
  getConfig,
  getInvitationByToken,
  hasSubmittedRsvp,
  normalizeToken,
  parseBoolean,
} from "./_lib/sheets.js";

const ALLOWED_DIETARY_VALUES = new Set([
  "none",
  "vegano",
  "vegetariano",
  "celiaco",
]);

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function readBody(req) {
  if (typeof req.body === "string") {
    return JSON.parse(req.body);
  }
  return req.body ?? {};
}

function validatePayload(payload) {
  const token = normalizeToken(payload.token);
  const email = String(payload.email ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const dietaryRestriction = String(payload.dietaryRestriction ?? "").trim();
  const notes = String(payload.notes ?? "").trim();

  if (!token) {
    return { ok: false };
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return { ok: false };
  }

  if (phone.length < 6) {
    return { ok: false };
  }

  if (!ALLOWED_DIETARY_VALUES.has(dietaryRestriction)) {
    return { ok: false };
  }

  if (notes.length > 1000) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      token,
      email,
      phone,
      dietaryRestriction,
      notes,
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, code: "METHOD_NOT_ALLOWED" });
    return;
  }

  try {
    const payload = readBody(req);
    const validation = validatePayload(payload);

    if (!validation.ok) {
      sendJson(res, 400, { ok: false, code: "VALIDATION_ERROR" });
      return;
    }

    const { token, email, phone, dietaryRestriction, notes } = validation.value;
    const invitation = await getInvitationByToken(token);

    if (!invitation) {
      sendJson(res, 404, { ok: false, code: "TOKEN_NOT_FOUND" });
      return;
    }

    const isActive = parseBoolean(invitation.active, false);
    if (!isActive) {
      sendJson(res, 404, { ok: false, code: "TOKEN_NOT_FOUND" });
      return;
    }

    const config = await getConfig();
    if (config.dedupeByToken) {
      const alreadySubmitted = await hasSubmittedRsvp(token);
      if (alreadySubmitted) {
        sendJson(res, 409, { ok: false, code: "ALREADY_SUBMITTED" });
        return;
      }
    }

    await appendRow("rsvp", [
      token,
      String(invitation.name ?? "").trim(),
      email,
      phone,
      dietaryRestriction,
      notes,
      new Date().toISOString(),
      "web",
      "",
    ]);

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { ok: false, code: "INTERNAL_ERROR" });
  }
}
