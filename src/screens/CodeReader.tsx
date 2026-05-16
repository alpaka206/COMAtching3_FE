// @ts-nocheck
import { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import instance from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useMatchPickState } from "../store/appStore";
import { ROUTES } from "../routes";
// QR 코드 인식을 위한 페이지 입니다.
const CodeReader = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(""); // QR 코드에서 읽은 데이터 상태 관리
  const [scannerError, setScannerError] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [, setCodeState] = useMatchPickState();
  const isSubmittingRef = useRef(false);

  // 서버로 해시 코드를 보내는 함수
  const sendHashCode = async (hashCode) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    const response = await instance.get(
      `/comatching/code-req/admin?code=${hashCode}`
    );
    if (response.data.status === 200) {
      // 코드 상태 업데이트
      setCodeState((prev) => ({
        ...prev,
        balance: response.data.data.currentPoint,
        formData: {
          ...prev.formData,
          match_code: hashCode,
        },
      }));
      navigate(ROUTES.matching);
    } else {
      isSubmittingRef.current = false;
      throw new Error("Unexpected response code or status");
    }
  };

  // 데이터에서 hashCode를 추출하는 함수(페이지로 이동해서 하는 경우든 변경해도 괜찮을듯)
  const extractHashCode = (rawValue) => {
    try {
      const url = new URL(rawValue);
      const code = url.pathname.split("/").filter(Boolean).at(-1);

      return code && /^[a-zA-Z0-9_-]+$/.test(code) ? code : null;
    } catch {
      return /^[a-zA-Z0-9_-]+$/.test(rawValue) ? rawValue : null;
    }
  };

  return (
    <div className="container">
      <div className="content">
        {/* 카메라로 QR 코드를 읽는 컴포넌트 */}
        {isScannerActive ? (
          <Scanner
            constraints={{ facingMode: "environment" }}
            onScan={(detectedCodes) => {
              const rawValue = detectedCodes[0]?.rawValue;
              if (rawValue) {
                setData(rawValue);
                const hashCode = extractHashCode(rawValue);
                if (hashCode) sendHashCode(hashCode);
              }
            }}
            onError={(error) => {
              setScannerError(error?.message ?? "카메라를 사용할 수 없습니다.");
            }}
            styles={{
              container: { width: "100%", height: "100%" },
              video: { width: "100%", height: "100%" },
            }}
          />
        ) : (
          <button
            type="button"
            className="submit-button"
            onClick={() => setIsScannerActive(true)}
          >
            카메라 시작
          </button>
        )}
        {scannerError && <p role="status">{scannerError}</p>}
        {/* 읽은 데이터 표시(서비스시 qr이 제대로 오는지, 인식을 했는지, 인터넷이 안되는건지 확인하기 위함) */}
        <p>{data}</p>
      </div>
    </div>
  );
};

export default CodeReader;
