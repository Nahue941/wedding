import {
  appendRow,
  getInvitationByToken,
  hasSubmittedRsvp,
  normalizeToken,
  parseBoolean,
  updateRsvpEmailTracking,
} from "./_lib/sheets.js";

const ALLOWED_DIETARY_VALUES = new Set([
  "none",
  "vegano",
  "vegetariano",
  "celiaco",
]);
const EMAIL_ERROR_MAX_CHARS = 200;

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

function truncateErrorMessage(error) {
  const message = String(
    error?.message ?? error ?? "Unknown email error",
  ).trim();
  return message.slice(0, EMAIL_ERROR_MAX_CHARS);
}

async function sendConfirmationEmail({ to, name }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const replyTo = process.env.EMAIL_REPLY_TO;

  if (!apiKey || !from) {
    throw new Error("Missing Resend configuration.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject: "Confirmación de asistencia recibida",
      html: `<p>Hola ${name || "invitado/a"}, recibimos la confirmación. Gracias por acompañarnos en este día especial.</p>`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${errorBody}`);
  }
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

    const alreadySubmitted = await hasSubmittedRsvp(token);
    if (alreadySubmitted) {
      sendJson(res, 409, { ok: false, code: "ALREADY_SUBMITTED" });
      return;
    }

    const appendResult = await appendRow("rsvp", [
      token,
      String(invitation.name ?? "").trim(),
      email,
      phone,
      dietaryRestriction,
      notes,
      new Date().toISOString(),
      false,
      "",
      "",
    ]);

    const appendedRowIndex = appendResult.rowIndex;
    if (!appendedRowIndex) {
      throw new Error("Unable to determine appended RSVP row index.");
    }

    let emailTracking = {
      emailSent: false,
      emailSentAt: "",
      emailError: "",
    };

    try {
      await sendConfirmationEmail({
        to: email,
        name: String(invitation.name ?? "").trim(),
      });

      emailTracking = {
        emailSent: true,
        emailSentAt: new Date().toISOString(),
        emailError: "",
      };
    } catch (error) {
      emailTracking = {
        emailSent: false,
        emailSentAt: "",
        emailError: truncateErrorMessage(error),
      };
    }

    try {
      await updateRsvpEmailTracking(appendedRowIndex, emailTracking);
    } catch {
      // RSVP submission should remain successful even if email tracking update fails.
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { ok: false, code: "INTERNAL_ERROR" });
  }
}
