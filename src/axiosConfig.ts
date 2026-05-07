import axios from "axios";

import {
  clearAuthTokens,
  getAuthorizationHeader,
  setAuthTokens,
} from "./lib/authStorage";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://cuk.comatching.site";

export class AuthRequiredError extends Error {
  constructor() {
    super("인증 토큰 없음");
    this.name = "AuthRequiredError";
  }
}

export function isAuthRequiredError(error: unknown) {
  return error instanceof AuthRequiredError;
}

export const publicInstance = axios.create({
  baseURL: API_BASE_URL,
});

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const authorization = getAuthorizationHeader();

  if (!authorization) {
    return Promise.reject(new AuthRequiredError());
  }

  config.headers.Authorization = authorization;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["authorization"];
    const newRefreshToken = response.headers["refresh-token"];

    if (newAccessToken || newRefreshToken) {
      setAuthTokens({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;

    if (
      status === 401 ||
      status === 403 ||
      code === "SEC-001" ||
      code === "SEC-002"
    ) {
      clearAuthTokens();
    }

    return Promise.reject(error);
  }
);

export default instance;
