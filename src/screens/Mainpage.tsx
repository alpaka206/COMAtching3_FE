// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainpageUnLogin from "./MainpageUnLogin";
import MainpageLogin from "./MainpageLogin";
import { hasAccessToken, setAuthTokens } from "../lib/authStorage";
import { ROUTES } from "../routes";

function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const userRole = urlParams.get("userRole");

    if (accessToken) {
      setAuthTokens({ accessToken, refreshToken, expiresHours: 1 });
      setIsLoggedIn(true);
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

    setIsLoggedIn(hasAccessToken());
  }, [navigate]);

  return isLoggedIn ? (
    <MainpageLogin onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <MainpageUnLogin />
  );
}

export default Mainpage;
