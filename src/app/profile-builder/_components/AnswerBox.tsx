// @ts-nocheck
import MBTIMaker from "./MBTIMaker";
import ContactFrequencyMaker from "./ContactFrequencyMaker";

const AnswerBox = ({
  showAnswerBox,
  questionNum,
  showMbtiAnswers,
  handleQuestionComplete,
  setSelectedMBTI,
  setChooseAnswer,
  setCurrentUserState,
  currentUserState,
}) => {
  if (!showAnswerBox) return null;

  return questionNum < 4 ? (
    <MBTIMaker
      mbtiAnswers={showMbtiAnswers}
      questionNum={questionNum}
      handleQuestionComplete={handleQuestionComplete}
      setSelectedMBTI={setSelectedMBTI}
      setChooseAnswer={setChooseAnswer}
    />
  ) : (
    <ContactFrequencyMaker
      handleQuestionComplete={handleQuestionComplete}
      setCurrentUserState={setCurrentUserState}
      currentUserState={currentUserState}
      setChooseAnswer={setChooseAnswer}
    />
  );
};

export default AnswerBox;
