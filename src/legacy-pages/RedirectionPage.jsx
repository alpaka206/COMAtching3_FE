import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DecodeJWT from "../components/DecodeJWT";

function Redirection() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  useEffect(() => {
    // 쿼리 스트링으로 토큰가져오기
    const token = new URL(window.location.href).searchParams.get("token");

    if (token) {
      // JWT 디코딩 함수(base64 이용) 역활 확인을 위해서
      //DecodeJWT 컴포넌트 진행후 테스트 못해봄
      const decoded = DecodeJWT(token);
      if (decoded) {
        // 역할 확인
        if (decoded.role === "ROLE_SOCIAL") {
          console.log("회원가입 유저");
          localStorage.removeItem("token");
          localStorage.setItem("token", token);
          // 회원가입 페이지로 이동
          navigate("/profile-builder");
        } else if (decoded.role === "ROLE_USER") {
          console.log("로그인 유저");
          localStorage.removeItem("token");
          localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
          navigate("/");
        } else if (decoded.role === "ROLE_ADMIN") {
          console.log("관리자");
          localStorage.removeItem("token");
          localStorage.setItem("token", token);
          navigate("/admin-select"); // 관리자 페이지로 이동
        } else {
          console.error("Unknown role:", decoded.role); // 알 수 없는 역할 처리
          navigate("/");
        }
      } else {
        console.error("Invalid token"); // 유효하지 않은 토큰 처리
        navigate("/");
      }
    } else {
      console.error("Token not found in cookies"); // URL에서 토큰을 찾을 수 없는 경우 처리
      navigate("/");
    }
  }, []); // 빈 배열이므로 컴포넌트가 처음 마운트될 때만 실행

  return <div></div>;
}

export default Redirection;
