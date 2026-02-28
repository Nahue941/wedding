import { getConfig } from "./_lib/sheets.js";

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, code: "METHOD_NOT_ALLOWED" });
    return;
  }

  try {
    const config = await getConfig();
    sendJson(res, 200, config);
  } catch {
    sendJson(res, 500, { ok: false, code: "INTERNAL_ERROR" });
  }
}
