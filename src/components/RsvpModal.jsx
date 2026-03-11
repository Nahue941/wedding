import { CheckCheck, Mail, PartyPopper, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const LOCAL_STORAGE_PREFIX = "rsvp_submitted_";

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

export default function RsvpModal({
  token = "",
  name = "",
  guestCount = 1,
  initialAlreadySubmitted = false,
}) {
  const normalizedToken = String(token).trim();
  const displayName = String(name ?? "").trim() || "invitado/a";
  const localStorageKey = useMemo(
    () => `${LOCAL_STORAGE_PREFIX}${normalizedToken}`,
    [normalizedToken],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpEnabled, setRsvpEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(
    Boolean(initialAlreadySubmitted),
  );
  const [form, setForm] = useState({
    email: "",
    dietaryRestriction: "none",
    notes: "",
  });

  const subtitle =
    guestCount === 1
      ? "Nos alegra mucho invitarte a compartir este dia con nosotros."
      : "Nos alegra mucho invitarlos a compartir este dia con nosotros.";

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
    const submittedLocally =
      typeof window !== "undefined" &&
      Boolean(normalizedToken) &&
      localStorage.getItem(localStorageKey) === "1";

    setAlreadySubmitted(Boolean(initialAlreadySubmitted) || submittedLocally);
  }, [initialAlreadySubmitted, localStorageKey, normalizedToken]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!normalizedToken || alreadySubmitted) {
      return;
    }

    const payload = {
      token: normalizedToken,
      email: form.email.trim(),
      dietaryRestriction: form.dietaryRestriction.trim(),
      notes: form.notes.trim(),
    };

    if (!payload.email) {
      setToastMessage("Revisa los datos del formulario.");
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
        setToastMessage("Ocurrio un error. Intenta nuevamente.");
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(localStorageKey, "1");
      }

      setAlreadySubmitted(true);
    } catch {
      setToastMessage("Ocurrio un error. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!normalizedToken || !rsvpEnabled) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-wine px-5 py-3 text-sm font-medium text-brand-cream shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-wine ring-offset-2 ring-offset-brand-cream"
        >
          {alreadySubmitted ? (
            <span className="inline-flex items-center gap-2">
              <CheckCheck size={16} />
              <span>Asistencia Confirmada</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Mail size={16} />
              <span>Responder invitacion</span>
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal key="rsvp-dialog-portal">
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                  <div className="flex items-center justify-end">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="rounded-md px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100"
                      >
                        <X size={30} className="shrink-0 -translate-y-px" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <Dialog.Title className="sr-only">
                    Confirmar asistencia
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Confirmo asistencia, ingreso email y opcionalmente notas.
                  </Dialog.Description>

                  {alreadySubmitted ? (
                    <div className="space-y-3">
                      <h4 className="text-lg sm:text-xl font-semibold text-brand-text text-center">
                        ¡Gracias por confirmar la asistencia!
                      </h4>
                      <p className="text-sm text-neutral-700 text-center">
                        Nos vemos el 25 de Septiembre para festejar juntos este gran
                        dia.
                      </p>
                      <div className="flex items-center justify-center my-4">
                        <PartyPopper size={40} />
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={onSubmit}>
                      <div className="space-y-2 text-center mb-6">
                        <h2 className="text-xl font-semibold text-brand-text">
                          ¡Hola, {displayName}!
                        </h2>
                        <p className="text-sm text-neutral-700">{subtitle}</p>
                      </div>

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
                          <option value="none">Ninguna</option>
                          <option value="vegano">Vegano</option>
                          <option value="vegetariano">Vegetariano</option>
                          <option value="celiaco">Celiaco</option>
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
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </Dialog.Root>
  );
}
