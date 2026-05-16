import { describe, expect, it } from "vitest";

import { decodeJwt } from "./decodeJwt";

const encodeBase64Url = (value: string) =>
  Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

describe("decodeJwt", () => {
  it("JWT base64url payload를 객체로 변환", () => {
    const token = [
      encodeBase64Url(JSON.stringify({ alg: "none" })),
      encodeBase64Url(JSON.stringify({ role: "ROLE_USER", name: "코매칭" })),
      "",
    ].join(".");

    expect(decodeJwt(token)).toEqual({
      role: "ROLE_USER",
      name: "코매칭",
    });
  });

  it("잘못된 JWT는 null 반환", () => {
    expect(decodeJwt("invalid-token")).toBeNull();
  });
});
