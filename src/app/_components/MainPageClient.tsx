// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPageGuest from "./MainPageGuest";
import MainPageLoggedIn from "./MainPageLoggedIn";
import { hasAccessToken, setAuthTokens } from "@/lib/authStorage";
import { ROUTES } from "@/routes";

function MainPageClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return hasAccessToken() || urlParams.has("accessToken");
  });
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const userRole = urlParams.get("userRole");

    if (accessToken) {
      setAuthTokens({ accessToken, refreshToken, expiresHours: 1 });
      window.history.replaceState(null, "", window.location.pathname);

      if (userRole === "SOCIAL") {
        navigate(ROUTES.hobby, { replace: true });
        return;
      }

      if (userRole === "USER") {
        navigate(ROUTES.home, { replace: true });
        return;
      }

      navigate(ROUTES.home, { replace: true });
      return;
    }

  }, [navigate]);

  return isLoggedIn ? (
    <MainPageLoggedIn onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <MainPageGuest />
  );
}

export default MainPageClient;
