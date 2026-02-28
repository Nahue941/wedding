import {
  getConfig,
  getInvitationByToken,
  hasSubmittedRsvp,
  normalizeToken,
  parseBoolean,
} from "./_lib/sheets.js";

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function getQueryParam(req, key) {
  if (req.query && key in req.query) {
    return req.query[key];
  }

  const url = new URL(req.url, "http://localhost");
  return url.searchParams.get(key);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, code: "METHOD_NOT_ALLOWED" });
    return;
  }

  try {
    const token = normalizeToken(getQueryParam(req, "token"));
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

    const config = await getConfig();
    const alreadySubmitted = config.dedupeByToken
      ? await hasSubmittedRsvp(token)
      : false;

    sendJson(res, 200, {
      ok: true,
      invitation: {
        token,
        name: String(invitation.name ?? "").trim(),
      },
      alreadySubmitted,
    });
  } catch {
    sendJson(res, 500, { ok: false, code: "INTERNAL_ERROR" });
  }
}
