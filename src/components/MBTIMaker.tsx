// @ts-nocheck
import { useState } from "react";
import PropTypes from "prop-types";
import * as styles from "../css/components/MBTIMaker.css.ts";

function MBTIMaker({
  mbtiAnswers,
  questionNum,
  handleQuestionComplete,
  setSelectedMBTI,
  setChooseAnswer,
}) {
  const [answerChecked, setAnswerChecked] = useState(null);

  const handleMBTIClick = (mbtiType, value, index) => {
    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [mbtiType]: value,
    }));
    setAnswerChecked(value);
    setChooseAnswer(index);
  };

  return (
    <div className={styles.mbtiMaker}>
      <div className={styles.mbtiMakerText}>내 답변</div>
      <button
        className={`${styles.mbtiMakerChooseButton} ${
          answerChecked === mbtiAnswers[questionNum][2] ? styles.selected : ""
        }`}
        onClick={() =>
          handleMBTIClick(
            mbtiAnswers[questionNum][4],
            mbtiAnswers[questionNum][2],
            0
          )
        }
      >
        <div className={styles.mbtiMakerButtonTitle}>
          {mbtiAnswers[questionNum][2]}
        </div>
        <div>{mbtiAnswers[questionNum][0]}</div>
      </button>
      <button
        className={`${styles.mbtiMakerChooseButton} ${
          answerChecked === mbtiAnswers[questionNum][3] ? styles.selected : ""
        }`}
        onClick={() =>
          handleMBTIClick(
            mbtiAnswers[questionNum][4],
            mbtiAnswers[questionNum][3],
            1
          )
        }
      >
        <div className={styles.mbtiMakerButtonTitle}>
          {mbtiAnswers[questionNum][3]}
        </div>
        <div>{mbtiAnswers[questionNum][1]}</div>
      </button>
      <button
        className={styles.mbtiMakerSubmitButton}
        onClick={() => handleQuestionComplete(questionNum)}
        disabled={!answerChecked}
      >
        전송
      </button>
    </div>
  );
}

MBTIMaker.propTypes = {
  mbtiAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired)
    .isRequired,
  questionNum: PropTypes.number.isRequired,
  handleQuestionComplete: PropTypes.func.isRequired,
  setSelectedMBTI: PropTypes.func.isRequired,
  setChooseAnswer: PropTypes.func.isRequired,
};

export default MBTIMaker;
