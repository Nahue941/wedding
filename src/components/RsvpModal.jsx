import { CheckCheck, Mail, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
    <div className="fixed bottom-6 right-4 left-4 sm:left-auto sm:w-auto z-70 rounded-xl bg-[#1f1f1f] px-4 py-3 text-sm text-white shadow-xl">
      {message}
    </div>
  );
}

export default function RsvpModal() {
  const token = useMemo(() => getTokenFromUrl(), []);
  const localStorageKey = `${LOCAL_STORAGE_PREFIX}${token}`;
  const hasBootstrappedRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(Boolean(token));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationError, setInvitationError] = useState("");
  const [name, setName] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [rsvpEnabled, setRsvpEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
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
      } catch {
        // Optional endpoint: keep defaults if request fails.
      }
    }

    loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (hasBootstrappedRef.current) {
      return;
    }
    hasBootstrappedRef.current = true;

    let cancelled = false;

    async function bootstrapInvitationState() {
      if (!token) {
        setIsInitializing(false);
        return;
      }

      setIsInitializing(true);
      setInvitationError("");

      const submittedLocally =
        typeof window !== "undefined" &&
        localStorage.getItem(localStorageKey) === "1";

      if (submittedLocally) {
        setAlreadySubmitted(true);
      }

      try {
        const response = await fetch(
          `/api/invitation?token=${encodeURIComponent(token)}`,
        );
        const data = await response.json();

        if (!response.ok) {
          if (!cancelled && !submittedLocally) {
            setInvitationError("No pudimos validar tu invitación.");
          }
          return;
        }

        if (!cancelled) {
          setName(data.invitation?.name?.trim?.() ?? "");
          setAlreadySubmitted(
            Boolean(data.alreadySubmitted) || submittedLocally,
          );
        }
      } catch {
        if (!cancelled && !submittedLocally) {
          setInvitationError("No pudimos validar tu invitación.");
        }
      } finally {
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    }

    bootstrapInvitationState();
    return () => {
      cancelled = true;
    };
  }, [token, localStorageKey]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!token || alreadySubmitted || invitationError || isInitializing) {
      return;
    }

    const payload = {
      token: token.trim(),
      email: form.email.trim(),
      dietaryRestriction: form.dietaryRestriction.trim(),
      notes: form.notes.trim(),
    };

    if (!payload.email) {
      setToastMessage("Revisá los datos del formulario.");
      return;
    }

    setIsSubmitting(true);

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

      if (typeof window !== "undefined") {
        localStorage.setItem(localStorageKey, "1");
      }

      setAlreadySubmitted(true);
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
        className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-wine px-5 py-3 text-sm font-medium text-brand-cream shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-wine ring-offset-2 ring-offset-brand-cream"
      >
        {alreadySubmitted ? (
          <>
            <CheckCheck size={16} />
            <span>Asistencia Confirmada</span>
          </>
        ) : (
          <>
            <Mail size={16} />
            <span>Responder invitación</span>
          </>
        )}
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
                <X size={30} className="shrink-0 -translate-y-px" />
              </button>
            </div>

            {isInitializing && (
              <p className="text-sm text-neutral-700">Cargando...</p>
            )}

            {!isInitializing && invitationError && (
              <p className="text-sm text-red-600">{invitationError}</p>
            )}

            {!isInitializing && !invitationError && alreadySubmitted && (
              <div className="space-y-3">
                <h4 className="text-lg sm:text-xl font-semibold text-brand-text">
                  ¡Gracias por confirmar la asistencia!
                </h4>
                <p className="text-sm text-neutral-700">
                  Nos vemos el 25 de Septiembre para festejar juntos este gran
                  día.
                </p>
              </div>
            )}

            {!isInitializing && !invitationError && !alreadySubmitted && (
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    className="mt-1 min-h-24 w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
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
