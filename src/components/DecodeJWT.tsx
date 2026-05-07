// @ts-nocheck
import base64 from "base-64";

function DecodeJWT({ token }) {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = base64.decode(payload);
    return JSON.parse(decodedPayload); // 디코딩된 페이로드를 JSON 객체로 변환
  } catch (error) {
    console.error("Invalid token", error); // 디코딩 중 오류 발생 시 처리
    return null;
  }
}

export default DecodeJWT;
