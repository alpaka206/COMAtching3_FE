// @ts-nocheck
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DecodeJWT from "../components/DecodeJWT";
import { setAuthTokens } from "../lib/authStorage";
import { ROUTES } from "../routes";

function Redirection() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get("token");

    if (!token) {
      navigate(ROUTES.home);
      return;
    }

    const decoded = DecodeJWT(token);

    if (!decoded) {
      console.warn("유효하지 않은 토큰");
      navigate(ROUTES.home);
      return;
    }

    if (decoded.role === "ROLE_SOCIAL") {
      setAuthTokens({ accessToken: token, expiresHours: 1 });
      navigate(ROUTES.profileBuilder);
      return;
    }

    if (decoded.role === "ROLE_USER") {
      setAuthTokens({ accessToken: token, expiresHours: 1 });
      navigate(ROUTES.home);
      return;
    }

    if (decoded.role === "ROLE_ADMIN") {
      setAuthTokens({ accessToken: token, expiresHours: 4 });
      navigate(ROUTES.adminSelect);
      return;
    }

    console.warn("알 수 없는 역할:", decoded.role);
    navigate(ROUTES.home);
  }, [navigate]);

  return null;
}

export default Redirection;
