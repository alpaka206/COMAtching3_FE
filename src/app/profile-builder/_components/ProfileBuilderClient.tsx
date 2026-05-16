// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { TypeAnimation } from "react-type-animation";
import { useSelectedMbtiState, useUserState } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import MemoizedShowQuestion from "@/components/ShowQuestion";
import AnswerBox from "@/components/AnswerBox";
import { QUESTIONS, MBTI_ANSWERS } from "@/data/questions";

const initialShowQuestions = () => QUESTIONS.map(() => [false, false]);

const ProfileBuilderClient = () => {
  const navigate = useNavigate();
  const [selectedMBTI, setSelectedMBTI] = useSelectedMbtiState(); // 선택한 MBTI 저장
  const [currentUserState, setCurrentUserState] = useUserState(); // 선택한 정보 저장
  const [showQuestions, setShowQuestions] = useState(initialShowQuestions()); // 질문 보여줬는지, 대답이 보여졌는지 상태 확인
  const [chooseAnswer, setChooseAnswer] = useState(null); // 어떤 선택지를 골랐는지 저장
  const [questionNum, setQuestionNum] = useState(0); // 현재 몇번째 질문인지 저장
  const [showAnswerBox, setShowAnswerBox] = useState(false); // 질문 타이핑이 끝나면 선택지가 나오도록 상태 저장
  const chatMessageRef = useRef(null);

  // 새로운 질문이 나타날 때마다 채팅창을 맨 아래로 스크롤
  useEffect(() => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, [showQuestions]);

  // 주어진 인덱스의 질문을 표시
  const handleShowQuestion = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index][0] = true;
      return updatedQuestions;
    });
    setQuestionNum(index);
  };

  // 주어진 인덱스의 질문을 완료로 표시
  const handleQuestionComplete = (index) => {
    setShowQuestions((prevShowQuestions) => {
      const updatedQuestions = [...prevShowQuestions];
      updatedQuestions[index][1] = true;
      return updatedQuestions;
    });
  };

  // MBTI를 저장한 후 취미 페이지로 이동
  const navigatehobby = () => {
    setCurrentUserState((prev) => ({
      ...prev,
      mbti: `${selectedMBTI.EI}${selectedMBTI.SN}${selectedMBTI.TF}${selectedMBTI.PJ}`,
    }));
    navigate("/hobby");
  };

  return (
    <div className="container">
      <HeaderNav />
      <div className="chat-message" ref={chatMessageRef}>
        <div className="ProfileBuilder">
          <TypeAnimation
            sequence={[
              "반가워요! Comatching AI가 매칭 상대를 찾기 위한 몇가지 간단한 질의응답을 진행하겠습니다. 😊",
              1000,
              () => handleShowQuestion(0),
            ]}
            speed={85}
            className="typing-animation"
            cursor={false}
          />
        </div>
        {QUESTIONS.map((_, index) => (
          <MemoizedShowQuestion
            key={index}
            showQuestions={showQuestions}
            QuestionNum={index}
            setShowAnswerBox={setShowAnswerBox}
            chooseAnswer={chooseAnswer}
            handleShowQuestion={handleShowQuestion}
            navigatehobby={navigatehobby}
            showMbtiAnswers={MBTI_ANSWERS}
            questions={QUESTIONS}
          />
        ))}
      </div>
      <AnswerBox
        showAnswerBox={showAnswerBox}
        questionNum={questionNum}
        showMbtiAnswers={MBTI_ANSWERS}
        handleQuestionComplete={handleQuestionComplete}
        setSelectedMBTI={setSelectedMBTI}
        setChooseAnswer={setChooseAnswer}
        setCurrentUserState={setCurrentUserState}
        currentUserState={currentUserState}
      />
      <Footer />
    </div>
  );
};

export default ProfileBuilderClient;
