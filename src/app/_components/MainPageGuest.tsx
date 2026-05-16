// @ts-nocheck
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import TotalUsersCounter from "@/components/TotalUsersCounter";
import { useNavigate } from "react-router-dom";
import Background from "@/components/Background";
import HeaderMain from "@/components/HeaderMain";
import { API_BASE_URL, publicInstance } from "@/axiosConfig";
import { ROUTES } from "@/routes";
// 로그인 되지 않은 메인페이지입니다.
function MainPageGuest() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [numParticipants, setNumParticipants] = useState(null); // 참가자 수를 저장할 상태 변수

  // 카카오 로그인 핸들러
  // 일반적인 형식과 다를텐데 아래 링크로 이동시켜서 백엔드에서 카카오 로그인을 처리한뒤
  // Redirection페이지로 옮겨서 role을 확인하는 과정을 거쳤습니다.
  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
    // alert("서비스 종료 ㅠㅠㅠㅠ");
  };
  
  // 서비스 이용법 안내 페이지로 이동하는 핸들러
  const handleVisitGuide = () => {
    navigate(ROUTES.guide);
  };

  // 참가자 수를 가져오는 비동기 함수
  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      const isLocalHost = ["localhost", "127.0.0.1"].includes(
        window.location.hostname
      );
      const usesDefaultApi = API_BASE_URL === "https://cuk.comatching.site";

      if (isLocalHost && usesDefaultApi) {
        setNumParticipants(null);
        return;
      }

      try {
        const response = await publicInstance.get("/api/participations");
        
        if (response.status === 200) {
          setNumParticipants(response.data.data);
        }
      } catch {
        setNumParticipants(null);
      }
    };
    fetchData();
  }, [setNumParticipants]);

  return (
    <div className="container">
      <Background />
      <div className="margin_top"></div>
      <div className="bubble-counter">
          <TotalUsersCounter
            font_size="16px"
            numParticipants={numParticipants}
          />
      </div>
      <HeaderMain />
      <div className="greeting-message">
        반갑습니다<br></br>
        코매칭이라면 당신은<br></br>
        이미 커플입니다
      </div>
      
      <div  style={{ marginTop: '69px' }}>
        <div className="bubble" >
          ⚡️10초만에 빠른 가입⚡️
        </div>
        <button className="kakao-login" type="button" onClick={handleLogin}>
            <div className="kakao-login-element">
              <img
                src="/assets/kakao.svg"
                alt="카카오"
                width="25"
                height="24"
                decoding="async"
              />
              <p>카카오로 시작하기</p>
            </div>
        </button>
      </div>
      <div className="help-text">이용에 도움이 필요하신가요?</div>
        <div>
          <button className="privacy-button" type="button" onClick={handleVisitGuide}>
            서비스 이용법 안내
          </button>
        </div>  
        <Footer /> 
        
    </div>
  );
}

export default MainPageGuest;
