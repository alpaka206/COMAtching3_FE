// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Background from "@/components/Background";
import {
  useMatchPickState,
  useMatchResultState,
  useResetMatchPickState,
  useResetMatchResultState,
} from "@/store/appStore";
import MBTISection from "@/components/MBTISection";
import hobbyIcons from "@/data/hobbyIcons"; // 취미 아이콘 데이터 가져오기
import Loading from "@/app/loading/_components/LoadingClient";
import HeaderBackPoint from "@/components/HeaderBackPoint";
import instance from "@/axiosConfig";
import { createMatchRequestPayload } from "@/features/matching/createMatchRequestPayload";
import { getMatchOptionReadiness } from "@/features/matching/getMatchOptionReadiness";
import { getMbtiCategoryIndex } from "@/features/matching/getMbtiCategoryIndex";
import { useCurrentPoint } from "@/hooks/useCurrentPoint";
import AgeButton from "./AgeButton";
import ClassMatchOptionButton from "./ClassMatchOptionButton";
import MatchOptionButton from "./MatchOptionButton";

const SWIPE_COMPLETE_POSITION = 252;

function MatchingClient() {
  const [matchState, setMatchState] = useMatchPickState();
  const [currentPoint, setUserPoint] = useCurrentPoint();
  const [imagePosition, setImagePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMBTISelected, setIsMBTISelected] = useState(false); // MBTI 2개 선택 여부를 추적
  const startX = useRef(0);
  const imagePositionRef = useRef(0);
  const animationFrameRef = useRef(null);
  const [, setMatchResult] = useMatchResultState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const resetMatchState = useResetMatchPickState();
  const resetMatchResultState = useResetMatchResultState();
  const {
    isAgeSelected,
    isContactFrequencySelected,
    isHobbySelected,
    isSubmitEnabled,
  } = getMatchOptionReadiness(matchState, isMBTISelected);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  const handleHobbyClick = (index) => {
    const isAlreadySelected = matchState.formData.hobbyOption.includes(index);
    const updatedHobbies = isAlreadySelected
      ? matchState.formData.hobbyOption.filter((hobby) => hobby !== index)
      : matchState.formData.hobbyOption.length < 5
      ? [...matchState.formData.hobbyOption, index]
      : matchState.formData.hobbyOption;

    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        hobbyOption: updatedHobbies,
      },
    }));
  };
  useEffect(() => {
    resetMatchState();
    resetMatchResultState();
  }, [resetMatchState, resetMatchResultState]);

  const updateImagePosition = (nextPosition) => {
    imagePositionRef.current = nextPosition;

    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      setImagePosition(imagePositionRef.current);
      animationFrameRef.current = null;
    });
  };

  const resetImagePosition = () => {
    imagePositionRef.current = 0;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setImagePosition(0);
  };

  const handleStart = (e) => {
    if (matchState.point > currentPoint) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    if (!isMBTISelected) return; // MBTI 2개가 선택되지 않으면 드래그 불가
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
  };

  const handleMove = (e) => {
    if (isDragging) {
      const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
      const deltaX = clientX - startX.current;
      const newPosition = Math.min(
        Math.max(0, imagePositionRef.current + deltaX),
        SWIPE_COMPLETE_POSITION
      );
      updateImagePosition(newPosition);
      startX.current = clientX; // 현재 위치 업데이트
    }
  };
  const handleEnd = async () => {
    if (!isDragging) return;
    if (matchState.point > currentPoint) {
      alert("포인트가 부족합니다!!");
      resetImagePosition();
      return; // 동작 중단
    }
    setIsDragging(false);

    if (!isAgeSelected) {
      alert("나이를 선택해 주세요.");
      resetImagePosition(); // 이미지 위치 초기화
      return;
    } else if (!isContactFrequencySelected) {
      alert("연락 빈도를 선택해 주세요.");
      resetImagePosition(); // 이미지 위치 초기화
      return;
    } else if (!isHobbySelected) {
      alert("취미를 선택해 주세요.(최대 5개)");
      resetImagePosition(); // 이미지 위치 초기화
      return;
    }

    if (imagePositionRef.current < SWIPE_COMPLETE_POSITION) {
      resetImagePosition();
      return;
    }

    const matchRequestPayload = createMatchRequestPayload(matchState);
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        requestPayload: matchRequestPayload,
      },
    }));
    

    try {
      setLoading(true);
      const response = await instance.post(
        "/auth/user/api/match/request",
        matchRequestPayload
      );
      
      if (response.status === 200) {
        setMatchResult((prev) => ({
          ...prev,
          age: response.data.data.age,
          comment: response.data.data.comment,
          contactFrequency: response.data.data.contactFrequency,
          currentPoint: response.data.data.currentPoint,
          gender: response.data.data.gender,
          hobby: response.data.data.hobby,
          major: response.data.data.major,
          mbti: response.data.data.mbti,
          socialId: response.data.data.contactId,
          song: response.data.data.song,
        }));
        setUserPoint((prev) => ({
          ...prev,
          point: response.data.data.currentPoint,
        }));
        
        navigate("/match-result",{ replace: true });
      } else {
        alert("실패하였습니다");
        navigate("/");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("매칭 요청 중 오류가 발생했습니다.");
      resetImagePosition();
    } finally {
      setLoading(false);
    }
  };

  // MBTI 선택 핸들러
  const handleMBTISelection = (value) => {
    // 선택한 것의 카테고리 구분
    const category = getMbtiCategoryIndex(value);

    setMatchState((prev) => {
      const updatedMBTI = [...prev.selectedMBTI];
      const updatedCategory = [...prev.selectedCategory];

      if (updatedCategory.includes(category)) {
        updatedMBTI[category] = value; // 이미 선택된 카테고리를 업데이트
      } else {
        if (updatedCategory.length >= 2) {
          updatedMBTI[updatedCategory[0]] = "X"; // 기존 선택을 제거
          updatedCategory.shift();
        }
        updatedMBTI[category] = value;
        updatedCategory.push(category);
      }

      const isSelected = updatedCategory.length === 2; // 2개 선택 여부 확인
      setIsMBTISelected(isSelected); // 2개가 선택되었을 때만 슬라이더 활성화

      return {
        ...prev,
        selectedMBTI: updatedMBTI,
        selectedCategory: updatedCategory,
      };
    });
  };

  const handleAgeSelection = (value, location) => {
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [location]: prev.formData[location] === value ? "" : value, // 선택 취소 로직
      },
    }));
  };

  // 유료 버튼 사용 클릭 핸들러
  const handleButtonClick = (index, cost) => {
    setMatchState((prev) => {
      const newIsUseOption = prev.isUseOption.map((option, i) =>
        i === index ? !option : option
      );

      // 비용 계산 로직
      const newPoint = newIsUseOption[index]
        ? prev.point + cost
        : prev.point - cost;

      return {
        ...prev,
        point: newPoint,
        isUseOption: newIsUseOption,
      };
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <Background />
          <HeaderBackPoint currentPoint={currentPoint} />
          <div className="matchcontent">
            <div className="match-title">
              <div className="match-title-text">Matching</div>
              <div className="match-title-inst-txt">
                매칭되고 싶은 상대를 입력하세요
              </div>
            </div>
          </div>
          <div className="matchcontent_mbti">
            <div className="match-title">
              <div className="match-title-text">
                MBTI <span className="match-required-text match-required-text-red">필수</span>
              </div>
              <div className="match-title-inst-txt">
                상대방의 MBTI 2개를 골라주세요.
              </div>
            </div>
            <MBTISection
              user={matchState.selectedMBTI}
              onClick={handleMBTISelection}
              name="MBTIButton"
            />
          </div>
          <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(0, 100)}
              >
                <div>
                  <div className="match-title-text">
                    나이<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 나이를 골라주세요
                  </div>
                </div>
                <MatchOptionButton
                  state={matchState.isUseOption[0]}
                  num={0}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(0, 100);
                  }}
                />
              </div>
            </div>
            {/* MatchOptionButton 클릭 시만 나이 선택 버튼 표시 */}
            {matchState.isUseOption[0] && (
              <div className="match-select-button">
                <AgeButton
                  formData={matchState.formData.ageOption}
                  value="YOUNGER"
                  text="연하"
                  onClick={() => handleAgeSelection("YOUNGER", "ageOption")}
                  isClickable={matchState.isUseOption[0]}
                />
                <AgeButton
                  formData={matchState.formData.ageOption}
                  value="EQUAL"
                  text="동갑"
                  onClick={() => handleAgeSelection("EQUAL", "ageOption")}
                  isClickable={matchState.isUseOption[0]}
                />
                <AgeButton
                  formData={matchState.formData.ageOption}
                  text="연상"
                  value="OLDER"
                  onClick={() => handleAgeSelection("OLDER", "ageOption")}
                  isClickable={matchState.isUseOption[0]}
                />
              </div>
            )}
          </div>
          <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(1, 100)} // 클릭 이벤트 추가
              >
                <div>
                  <div className="match-title-text">
                    연락 빈도<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    원하는 연락 빈도 선택
                  </div>
                </div>
                <MatchOptionButton
                  state={matchState.isUseOption[1]}
                  num={1}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(1, 100);
                  }}
                />
              </div>
            </div>
            {matchState.isUseOption[1] && (
              <div className="match-select-button">
                <AgeButton
                  formData={matchState.formData.contactFrequencyOption}
                  text="자주"
                  value="FREQUENT"
                  onClick={() =>
                    handleAgeSelection("FREQUENT", "contactFrequencyOption")
                  }
                  isClickable={matchState.isUseOption[1]}
                />
                <AgeButton
                  formData={matchState.formData.contactFrequencyOption}
                  text="보통"
                  value="NORMAL"
                  onClick={() =>
                    handleAgeSelection("NORMAL", "contactFrequencyOption")
                  }
                  isClickable={matchState.isUseOption[1]}
                />
                <AgeButton
                  formData={matchState.formData.contactFrequencyOption}
                  text="가끔"
                  value="NOT_FREQUENT"
                  onClick={() =>
                    handleAgeSelection(
                      "NOT_FREQUENT",
                      "contactFrequencyOption"
                    )
                  }
                  isClickable={matchState.isUseOption[1]}
                />
              </div>
            )}
          </div>
          <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(2, 100)}
              >
                <div>
                  <div className="match-title-text">
                    취미<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 취미를 5개를 골라주세요
                  </div>
                </div>
                <MatchOptionButton
                  state={matchState.isUseOption[2]}
                  num={2}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(2, 100);
                  }}
                />
              </div>
            </div>
            {matchState.isUseOption[2] && (
              <div className="match-hobby-grid">
                {hobbyIcons.map((hobby, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`hobby-item ${
                      matchState.isUseOption[2]
                        ? `${
                            matchState.formData.hobbyOption.includes(
                              hobby.label
                            )
                              ? "selected"
                              : ""
                          }`
                        : " "
                    }`}
                    onClick={() => handleHobbyClick(hobby.label)}
                    disabled={!matchState.isUseOption[2]}
                  >
                    <img
                      src={hobby.image}
                      alt={hobby.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <div>{hobby.label}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="matchcontent_detail matchfinalcontent">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(3, 200)} // 클릭 이벤트 추가
              >
                <div>
                  <div className="match-title-text">
                    같은과는 싫어요
                    <span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    과 CC를 피할 수 있어요
                  </div>
                </div>
                <ClassMatchOptionButton
                  state={matchState.isUseOption[3]}
                  num={3}
                  money={200}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(3, 200);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="cost-bubble"
            style={{
              display: isMBTISelected && matchState.point > 0 ? "block" : "none",
            }}
          >
            <img src="/assets/footercoin.svg" alt="coin" />
            <span>{matchState.point}P 소모</span>
          </div>

          <div
            className="footer_btn"
            onMouseMove={isSubmitEnabled ? handleMove : null}
            onMouseUp={isSubmitEnabled ? handleEnd : null}
            onTouchMove={isSubmitEnabled ? handleMove : null}
            onTouchEnd={isSubmitEnabled ? handleEnd : null}
          >
            <div
              className="footer_btn_box"
              style={{
                backgroundColor: isSubmitEnabled ? "white" : "lightgray",
                opacity: isSubmitEnabled ? 1 : 0.5,
                boxShadow: isSubmitEnabled
                  ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  : "none",
              }}
            >
              <img
                src={
                  isSubmitEnabled
                    ? "/assets/slider_active.svg"
                    : "/assets/slider.svg"
                } // 이미지 변경
                alt=""
                style={{
                  transform: `translateX(${imagePosition}px)`,
                  willChange: isDragging ? "transform" : "auto",
                  touchAction: isSubmitEnabled ? "none" : "auto",
                  cursor: isSubmitEnabled ? "pointer" : "not-allowed",
                }} // 커서 변경
                onMouseDown={handleStart}
                onTouchStart={handleStart}
              />
              <p>
                {isSubmitEnabled ? "밀어서 커플되기" : "조건을 선택해 주세요"}
              </p>
            </div>
          </div>

          <div className="footer"></div>
        </div>
      )}
    </>
  );
}

export default MatchingClient;
