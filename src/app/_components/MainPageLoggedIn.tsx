// @ts-nocheck
import { useEffect, useState } from "react";

import HeaderMain from "@/components/HeaderMain";
import UserInfoSummary from "@/components/UserInfoSummary";
import { useChargeState, useUserState } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "@/components/TotalUsersCounter";
import BottomNavButton from "@/components/BottomNavButton";
import MyInfoButton from "@/components/MyInfoButton";
import ChargeButtonInfo from "@/components/ChargeButtonInfo";

import Footer from "@/components/Footer";
import TutorialSlides from "@/components/TutorialSlides";
import HeartButtonInfo from "@/components/HeartButtonInfo";
import Background from "@/components/Background";
import instance, { isAuthRequiredError } from "@/axiosConfig";
import AccountButtonInfo from "@/components/AccountButtonInfo";
import EventModal from "@/components/EventModal";
import { clearAuthTokens } from "@/lib/authStorage";
import { ROUTES } from "@/routes";
function MainPageLoggedIn({ onLogout }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [isAccountClicked, setIsAccountClicked] = useState(false);
  const [isPointClicked, setIsPointClicked] = useState(false); // 포인트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [isHeartClicked, setIsHeartClicked] = useState(false); // 하트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [showTutorial, setShowTutorial] = useState(false); // Show tutorial on login
  const [userInfo, setUserInfo] = useUserState();
  // 충전 요청 상태를 관리하는 Recoil 상태(너무 자주 못누르게 하기 위해서 임시방편이였습니다. 회의를 통해 방식 수정이 필요합니다)
  const [chargeclick] = useChargeState();
  const showEventModal = userInfo.eventokay === false;
  
  const handleAccountToggleClick = () => {
    setIsAccountClicked((prevIsClicked) => !prevIsClicked);
  };
  // 포인트 충전 토글 클릭 핸들러
  const handlePointToggleClick = () => {
    setIsPointClicked((prevIsClicked) => !prevIsClicked);
  };

  // 하트 충전 토글 클릭 핸들러
  const handleHeartToggleClick = () => {
    setIsHeartClicked((prevIsClicked) => !prevIsClicked);
  };
  const handleLogout = () => {
    clearAuthTokens();
    onLogout?.();
    navigate(ROUTES.home, { replace: true });
  };
  const handleCancel = async () => {
    try {
      const response = await instance.get("/auth/user/api/event/no-pickMe");
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          eventokay: true, // Set eventokay to false after participation
        }));
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };
  
  const handleParticipate = async () => {
    try {
      const response = await instance.get("/auth/user/api/event/pickMe");
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          eventokay: true, // Set eventokay to false after participation
          pickMe: prev.pickMe + 1,
        }));
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };
  

  // 사용자 정보를 가져오는 비동기 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/auth/user/api/info"); // instance로 요청
        
        if (response.status === 200) {
          setUserInfo((prev) => ({
            ...prev,
            username: response.data.data.username,
            major: response.data.data.major,
            age: response.data.data.age,
            song: response.data.data.song,
            mbti: response.data.data.mbti,
            point: response.data.data.point,
            pickMe: response.data.data.pickMe,
            hobby:response.data.data.hobbies,
            comment:response.data.data.comment,
            contact_frequency:response.data.data.contactFrequency,
            contact_id: response.data.data.contactId,
            canRequestCharge: response.data.data.canRequestCharge,
            numParticipants: response.data.data.participations,
            eventokay: response.data.data.event1,
          }));
      }
    } catch (error) {
        if (
          isAuthRequiredError(error) ||
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          clearAuthTokens();
          onLogout?.();
          navigate(ROUTES.home, { replace: true });
          return;
        }
        console.error("Error fetching data:", error);
    }
    };
    fetchData();
  }, [navigate, onLogout, setUserInfo]);
  const handleNotService = () => {
    alert("해당 서비스는 9/12일 10:00에 오픈됩니다 축제까지 기다려주세요!");
  };
  const handleVisitGuide = () => {
    navigate("/guide");
  };
  const handleCharge = () => {
    navigate("/charge");
  };
  const handleHeartCharge = () => {
    navigate("/heart");
  };
  const handleClickmatch = () => {
    navigate("/matching");
  };
  const handleVisitcheckresult = () => {
    navigate("/check-result");
  };

  return (
    <main className="container">
      <HeaderMain />
      <Background />
      <div className="welcome">
        {userInfo.username}님,
        <br />
        환영합니다.
      </div>
      <div className="Mainpage__Login">
        <UserInfoSummary
          user={userInfo}
          ifMainpage={true}
        />
        <div
          onClick={handleClickmatch}
          // onClick={handleNotService}
        >
          <button className="matching-button">
            AI 매칭하기 ▶
            <TotalUsersCounter
              font_size="15px"
              numParticipants={userInfo.numParticipants}
            />
          </button>
        </div>
        <div className="button-group">
          {userInfo.canRequestCharge ? (
            <MyInfoButton
              imgSrc="/assets/point.svg"
              infoText={`${userInfo.point}P`}
              buttonText="잔여포인트"
              handleCharge={handleCharge} 
              // canRequestCharge가 true일 때 handleCharge 전달
              // handleCharge={handleNotService}
            />
          ) : (
            <MyInfoButton
              imgSrc="/assets/point.svg"
              infoText={`${userInfo.point}P`}
              buttonText="잔여포인트"
              handleCharge={null} // canRequestCharge가 false일 때 handleCharge는 null
            />
          )}
          <MyInfoButton
            imgSrc="/assets/heart.svg"
            infoText={`${userInfo.pickMe}회`}
            buttonText="내가 뽑힐 횟수"
            handleCharge={handleHeartCharge}
            // handleCharge={handleNotService}
          />
        </div>

        {isPointClicked ? (
          <ChargeButtonInfo
            // handleNotService={handleNotService}
            handleChargeRequest={handleCharge}
            handleToggleClick={handlePointToggleClick}
            chargeclick={chargeclick}
          />
        ) : (
          <div className="charge-request-unclicked">
            💁 부스에 포인트 충전 요청하기
            {userInfo.canRequestCharge ? (
              <button
                className="charge-request-unclicked-img"
                type="button"
                onClick={handlePointToggleClick}
                // onClick={handleNotService}
              >
                <img
                  src="/assets/arrowbottom.svg"
                  alt="충전요청 열기"
                />
              </button>
            ) : (
              <div className="charge-request-disabled">요청완료</div>
            )}
          </div>
        )}
        {isAccountClicked ? (
          <AccountButtonInfo
            handleToggleClick={handleAccountToggleClick}
          />
        ) : (
          <div className="charge-request-unclicked">
            💸입금 계좌 확인하기
            <button
                className="charge-request-unclicked-img"
                type="button"
                // onClick={handleAccountToggleClick}
                onClick={handleNotService}
              >
                <img
                  src="/assets/arrowbottom.svg"
                  alt="충전요청 열기"
                />
              </button>
          </div>
        )}
        {isHeartClicked ? (
          <HeartButtonInfo
            // handleNotService={handleNotService}
            point={userInfo.point}
            
            handleChargeRequest={handleHeartCharge}
            handleToggleClick={handleHeartToggleClick}
            handleHeartCharge={handleHeartCharge}
          />
        ) : (
          <div className="charge-request-unclicked">
            ❤️ 포인트 하트로 교환하기
            <button
              className="charge-request-unclicked-img"
              type="button"
              onClick={handleHeartToggleClick}
              // onClick={handleNotService}
            >
              <img
                src="/assets/arrowbottom.svg"
                alt="충전요청 열기"
              />
            </button>
          </div>
        )}
        <div className="button-group">
          <BottomNavButton
            // onClick={handleNotService}
            onClick={handleVisitcheckresult}
            imgSrc="/assets/checkresult.svg"
            imgText="조회버튼"
            buttonText="조회하기"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc="/assets/guidebook.svg"
            imgText="가이드북"
            buttonText="가이드북"
          />
        </div>
        {/* <div  style={{ height: '50px' }}></div> */}
      </div>
      <div className="logout-container">
        <button type="button" onClick={handleLogout} className="logout-link">
          로그아웃
        </button>
      </div>
      <Footer/>
      {/* <NavBar/> */}
      {showEventModal && userInfo.eventokay === false && (
        <EventModal
          onParticipate={handleParticipate}
          onCancel={handleCancel}
          
        />
      )}
      {showTutorial && (
        <TutorialSlides onComplete={() => setShowTutorial(false)} />
      )}
    </main>
  );
}

export default MainPageLoggedIn;
