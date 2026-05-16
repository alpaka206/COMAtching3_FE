// @ts-nocheck
import * as styles from "@/css/components/ContactFrequencyMaker.css.ts";

function ContactFrequencyMaker({ handleQuestionComplete, currentUserState, setCurrentUserState, setChooseAnswer }) {
  // 연락 빈도를 클릭했을 때 처리하는 함수
  const handleAgeClick = (value, index) => {
    setCurrentUserState((prev) => ({
      ...prev,
      contact_frequency: value,
    }));
    setChooseAnswer(index);
  };

  return (
    <div className="MBTIMaker">
      <div className="MBTIMaker-text">내 답변</div>
      <div className="match-select-button">
        {/* 연락 빈도 선택 버튼 */}
        {["자주", "보통", "가끔"].map((value, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.ageMaker} ${currentUserState.contact_frequency === value ? styles.selected : ""}`}
            onClick={() => handleAgeClick(value, index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        className="MBTIMaker-submit-button"
        onClick={() => handleQuestionComplete(4)}
        disabled={currentUserState.contact_frequency.length < 1}
      >
        전송
      </button>
    </div>
  );
}

export default ContactFrequencyMaker;
