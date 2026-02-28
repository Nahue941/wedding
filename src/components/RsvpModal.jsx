import { useEffect, useMemo, useState } from "react";

const LOCAL_STORAGE_PREFIX = "rsvp_submitted_";

function getTokenFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("token")?.trim() ?? "";
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-4 left-4 sm:left-auto sm:w-auto z-[70] rounded-xl bg-[#1f1f1f] px-4 py-3 text-sm text-white shadow-xl">
      {message}
    </div>
  );
}

export default function RsvpModal() {
  const token = useMemo(() => getTokenFromUrl(), []);
  const localStorageKey = `${LOCAL_STORAGE_PREFIX}${token}`;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationError, setInvitationError] = useState("");
  const [name, setName] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [rsvpEnabled, setRsvpEnabled] = useState(true);
  const [dedupeByToken, setDedupeByToken] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    phone: "",
    dietaryRestriction: "none",
    notes: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch("/api/config");
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (!cancelled && typeof data.rsvpEnabled === "boolean") {
          setRsvpEnabled(data.rsvpEnabled);
        }
        if (!cancelled && typeof data.dedupeByToken === "boolean") {
          setDedupeByToken(data.dedupeByToken);
        }
      } catch {
        // Optional endpoint: keep defaults if request fails.
      }
    }

    loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  async function openModal() {
    setIsOpen(true);
    setInvitationError("");
    setIsLoading(true);

    if (!token) {
      setInvitationError("Token de invitación inválido.");
      setIsLoading(false);
      return;
    }

    const submittedLocally =
      dedupeByToken &&
      typeof window !== "undefined" &&
      localStorage.getItem(localStorageKey) === "1";

    try {
      const response = await fetch(
        `/api/invitation?token=${encodeURIComponent(token)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setInvitationError("No pudimos validar tu invitación.");
        return;
      }

      setName(data.invitation?.name?.trim?.() ?? "");
      setAlreadySubmitted(Boolean(data.alreadySubmitted) || submittedLocally);
    } catch {
      setInvitationError("No pudimos validar tu invitación.");
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!token || alreadySubmitted) {
      return;
    }

    const payload = {
      token: token.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      dietaryRestriction: form.dietaryRestriction.trim(),
      notes: form.notes.trim(),
    };

    if (!payload.email || !payload.phone || payload.phone.length < 6) {
      setToastMessage("Revisá los datos del formulario.");
      return;
    }

    setIsSubmitting(true);
    setInvitationError("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.status === 409 || data.code === "ALREADY_SUBMITTED") {
        setAlreadySubmitted(true);
        setToastMessage("Ya confirmaste");
        return;
      }

      if (!response.ok) {
        setToastMessage("Ocurrió un error. Intentá nuevamente.");
        return;
      }

      if (dedupeByToken && typeof window !== "undefined") {
        localStorage.setItem(localStorageKey, "1");
      }
      setToastMessage("Confirmación enviada.");
      closeModal();
    } catch {
      setToastMessage("Ocurrió un error. Intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token || !rsvpEnabled) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed bottom-6 right-4 z-40 rounded-full bg-brand-wine px-5 py-3 text-sm font-medium text-brand-cream shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-wine focus:ring-offset-2"
      >
        Responder invitación
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-brand-text">RSVP</h3>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100"
              >
                Cerrar
              </button>
            </div>

            {isLoading && (
              <p className="text-sm text-neutral-700">Cargando...</p>
            )}

            {!isLoading && invitationError && (
              <p className="text-sm text-red-600">{invitationError}</p>
            )}

            {!isLoading && !invitationError && (
              <form className="space-y-4" onSubmit={onSubmit}>
                <label className="block text-sm text-neutral-700">
                  Nombre:
                  <input
                    type="text"
                    value={name}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-700"
                  />
                </label>

                <label className="block text-sm text-neutral-700">
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                    disabled={alreadySubmitted || isSubmitting}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </label>

                <label className="block text-sm text-neutral-700">
                  Teléfono
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    required
                    minLength={6}
                    disabled={alreadySubmitted || isSubmitting}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </label>

                <label className="block text-sm text-neutral-700">
                  Restricciones alimenticias
                  <select
                    value={form.dietaryRestriction}
                    onChange={(event) =>
                      updateField("dietaryRestriction", event.target.value)
                    }
                    disabled={alreadySubmitted || isSubmitting}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                  >
                    <option value="none">ninguna</option>
                    <option value="vegano">vegano</option>
                    <option value="vegetariano">vegetariano</option>
                    <option value="celiaco">celiaco</option>
                  </select>
                </label>

                <label className="block text-sm text-neutral-700">
                  Observaciones
                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      updateField("notes", event.target.value)
                    }
                    maxLength={1000}
                    disabled={alreadySubmitted || isSubmitting}
                    className="mt-1 min-h-24 w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </label>

                {alreadySubmitted && (
                  <p className="text-sm font-medium text-brand-text">
                    Ya confirmaste
                  </p>
                )}

                <button
                  type="submit"
                  disabled={alreadySubmitted || isSubmitting}
                  className="w-full rounded-lg bg-brand-wine px-4 py-2.5 text-brand-cream disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Enviando..." : "Confirmar asistencia"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </>
  );
}
