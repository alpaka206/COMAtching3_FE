import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "Authorization";
const REFRESH_TOKEN_KEY = "RefreshToken";
const LEGACY_LOCAL_TOKEN_KEY = "token";

type AuthTokens = {
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresHours?: number;
};

const stripBearer = (token: string) =>
  token.startsWith("Bearer ") ? token.slice(7) : token;

const getCookieOptions = (expiresHours = 1) => ({
  path: "/",
  sameSite: "lax" as const,
  secure: typeof window !== "undefined" && window.location.protocol === "https:",
  expires: expiresHours / 24,
});

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY) ?? "";
}

export function hasAccessToken() {
  return getAccessToken().length > 0;
}

export function getAuthorizationHeader() {
  const token = getAccessToken();
  return token ? `Bearer ${stripBearer(token)}` : undefined;
}

export function setAuthTokens({
  accessToken,
  refreshToken,
  expiresHours = 1,
}: AuthTokens) {
  const cookieOptions = getCookieOptions(expiresHours);

  if (accessToken) {
    Cookies.set(ACCESS_TOKEN_KEY, stripBearer(accessToken), cookieOptions);
  }

  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, stripBearer(refreshToken), cookieOptions);
  }

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(LEGACY_LOCAL_TOKEN_KEY);
  }
}

export function clearAuthTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(LEGACY_LOCAL_TOKEN_KEY);
  }
}
