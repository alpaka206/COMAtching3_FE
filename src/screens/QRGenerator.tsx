// @ts-nocheck
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axios from "../axiosConfig";
import HeaderNav from "../components/HeaderNav";
import { useNavigate } from "react-router-dom";
// QR코드 만들기
const QRGenerator = () => {
  const navigate = useNavigate();
  const [hashCode, setHashCode] = useState(""); // 기본은 빈값

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      try {
        const response = await axios.get("/comatching/code-req/user");
        if (response.status === 200) {
          setHashCode(response.data.data.match_code);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <HeaderNav />
      <div className="content">
        <div className="QRGenerator">
          <QRCode value={`https://cuk-comatching.web.app/${hashCode}`} />
        </div>
        <button className="QRGenerator-Button" onClick={() => navigate("/")}>
          코매칭 시작하기!
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;
