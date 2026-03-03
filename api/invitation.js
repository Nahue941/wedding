import {
  getInvitationByToken,
  hasSubmittedRsvp,
  normalizeToken,
  parseBoolean,
} from "./_lib/sheets.js";

const ALLOWED_HOSTS = new Set([
  "natynahue.com",
  "www.natynahue.com",
  "localhost:5173",
  "localhost:3000",
  "127.0.0.1:5173",
  "127.0.0.1:3000",
]);

const ALLOWED_ORIGINS = new Set([
  "https://natynahue.com",
  "https://www.natynahue.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
]);

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function getErrorDetails(error) {
  return {
    message: String(error?.message ?? error ?? "Unknown error"),
    stack: String(error?.stack ?? "").split("\n").slice(0, 6).join("\n"),
  };
}

function isAllowedHost(host) {
  if (!host) {
    return false;
  }

  return ALLOWED_HOSTS.has(host.toLowerCase());
}

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  return ALLOWED_ORIGINS.has(origin.toLowerCase());
}

function parseGuestCount(value) {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, code: "METHOD_NOT_ALLOWED" });
    return;
  }

  try {
    const host = String(req.headers.host ?? "").toLowerCase();
    if (!isAllowedHost(host)) {
      sendJson(res, 403, { ok: false, code: "FORBIDDEN_HOST", host });
      return;
    }

    const origin = req.headers.origin;
    if (!isAllowedOrigin(origin)) {
      sendJson(res, 403, { ok: false, code: "FORBIDDEN_ORIGIN", origin });
      return;
    }

    const url = new URL(req.url, `https://${host}`);
    const token = normalizeToken(url.searchParams.get("token"));
    if (!token) {
      sendJson(res, 400, { ok: false, code: "MISSING_TOKEN" });
      return;
    }

    const invitation = await getInvitationByToken(token);
    if (!invitation) {
      sendJson(res, 404, { ok: false, code: "TOKEN_NOT_FOUND" });
      return;
    }

    const isActive = parseBoolean(invitation.active, false);
    if (!isActive) {
      sendJson(res, 403, { ok: false, code: "INACTIVE_TOKEN" });
      return;
    }

    const alreadySubmitted = await hasSubmittedRsvp(token);

    sendJson(res, 200, {
      ok: true,
      invitation: {
        token,
        name: String(invitation.name ?? "").trim(),
        guestCount: parseGuestCount(invitation.guestCount),
      },
      alreadySubmitted,
    });
  } catch (error) {
    const details = getErrorDetails(error);
    console.error("[api/invitation] INTERNAL_ERROR", {
      host: String(req.headers.host ?? ""),
      origin: String(req.headers.origin ?? ""),
      details,
    });

    if (process.env.NODE_ENV !== "production") {
      sendJson(res, 500, {
        ok: false,
        code: "INTERNAL_ERROR",
        details,
      });
      return;
    }

    sendJson(res, 500, { ok: false, code: "INTERNAL_ERROR" });
  }
}
