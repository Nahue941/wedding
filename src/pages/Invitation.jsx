import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const INVITATION_TOKEN_KEY = "invitation_token";

export default function Invitation() {
  const { token } = useParams();
  const navigate = useNavigate();

  const normalizedToken = String(token ?? "").trim();

  useEffect(() => {
    let cancelled = false;

    async function validateToken() {
      if (!normalizedToken) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(INVITATION_TOKEN_KEY);
        }
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          `/api/invitation?token=${encodeURIComponent(normalizedToken)}`,
        );

        if (!response.ok || cancelled) {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(INVITATION_TOKEN_KEY);
          }
          if (!cancelled) {
            navigate("/", { replace: true });
          }
          return;
        }

        if (typeof window !== "undefined") {
          window.localStorage.setItem(INVITATION_TOKEN_KEY, normalizedToken);
        }

        navigate("/", { replace: true });
      } catch {
        if (!cancelled) {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(INVITATION_TOKEN_KEY);
          }
          navigate("/", { replace: true });
        }
      }
    }

    validateToken();
    return () => {
      cancelled = true;
    };
  }, [navigate, normalizedToken]);

  return null;
}
