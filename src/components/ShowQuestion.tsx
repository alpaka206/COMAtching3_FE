// @ts-nocheck
import React, { Fragment } from "react";
import { TypeAnimation } from "react-type-animation";

function ShowQuestion({
  showQuestions,
  showMbtiAnswers,
  QuestionNum,
  setShowAnswerBox,
  chooseAnswer,
  handleShowQuestion,
  navigatehobby,
  questions,
}) {
  const handleNextStep = () => {
    if (QuestionNum < 4) {
      handleShowQuestion(QuestionNum + 1);
    } else {
      navigatehobby();
    }
  };

  return (
    <Fragment>
      {showQuestions[QuestionNum][0] && (
        <Fragment>
          <div className="ProfileBuilder">
            <TypeAnimation
              sequence={[
                questions[QuestionNum],
                1000,
                () => setShowAnswerBox(true),
              ]}
              speed={85}
              className="typing-animation"
              cursor={false}
            />
          </div>
          {showQuestions[QuestionNum][1] && (
            <div className="ProfileBuilder-answer">
              <TypeAnimation
                sequence={[
                  showMbtiAnswers[QuestionNum][chooseAnswer],
                  1000,
                  () => setShowAnswerBox(false),
                  handleNextStep,
                ]}
                speed={85}
                className="typing-animation"
                cursor={false}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

// React.memo 적용
export const MemoizedShowQuestion = React.memo(ShowQuestion);

export default MemoizedShowQuestion;
