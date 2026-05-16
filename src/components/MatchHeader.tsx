// @ts-nocheck
import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderNav.css";
import { ROUTES } from "../routes";
// 뽑기관련된 페이지의 헤더 컴포넌트입니다.
// 로고 클릭시 모든 데이터가 초기화 된채로 돌아가야합니다.
function MatchHeader({ MatchState, setMatchState, setMatchPageResult }) {
  const navigate = useNavigate();
  const handleMatchLogo = () => {
    setMatchState({
      selectedMBTI: ["X", "X", "X", "X"],
      selectedCategory: [],
      point: 500,
      balance: null,
      isUseOption: [false, false, false, false],
      formData: {
        mbtiOption: "",
        contactFrequencyOption: "",
        hobbyOption: [],
        ageOption: "",
        match_code: "",
        sameMajorOption: false,
      },
    });
    setMatchPageResult({
      major: null,
      age: null,
      hobby: [],
      mbti: null,
      song: null,
      contactFrequency: null,
      contactId: null,
      word: null,
    });
    navigate(ROUTES.codeReader);
  };
  return (
    <div className="match-header">
      <div>
        <img
          className={styles.logoImg}
          src="/assets/logowhite.webp"
          alt="로고"
          onClick={handleMatchLogo}
        />
      </div>
      <div className="match-point-remaining">
        잔여포인트
        <img
          src="/assets/point.svg"
          alt="cost"
        />
        {MatchState.balance}
      </div>
    </div>
  );
}

export default MatchHeader;
