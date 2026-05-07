// @ts-nocheck
import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderNav.css";
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
        mbti_option: "",
        contact_frequency_option: "",
        hobby_option: [],
        age_option: "",
        match_code: "",
        no_same_major_option: false,
        ai_option_count: 0,
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
    navigate("/code-reader");
  };
  return (
    <div className="match-header">
      <div>
        <img
          className={styles.logoImg}
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/logowhite.png`}
          alt="로고"
          onClick={handleMatchLogo}
        />
      </div>
      <div className="match-point-remaining">
        잔여포인트
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/point.svg`}
          alt="cost"
        />
        {MatchState.balance}
      </div>
    </div>
  );
}

export default MatchHeader;
