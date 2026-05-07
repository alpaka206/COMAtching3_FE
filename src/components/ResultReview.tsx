// @ts-nocheck
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import instance, { isAuthRequiredError } from "../axiosConfig";
import { clearAuthTokens } from "../lib/authStorage";
import { ROUTES } from "../routes";

// 스타 스타일 설정
const blackStarStyles = {
  color: "#FF775E",
  fontSize: "40px",
};

function ResultReview({ user, setIsReview }) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  // 리뷰 제출 핸들러
  const handleReviewSubmit = async () => {
    const FormData = {
      history_id: user.history_id,
      grade: score,
    };

    try {
      const response = await instance.post("/user/comatch/feedback", FormData);

      if (
        response.data.code === "SEC-001" ||
        response.data.code === "SEC-002"
      ) {
        clearAuthTokens();
        navigate(ROUTES.home);
      } else if (response.data.status === 200) {
        // 리뷰 제출 후 상태 업데이트
        // 리뷰 제출할때마다 다시 받아오는것은 불필요하다고 생각해서 리뷰하기만 사라지도록 했습니다.
        setIsReview((prev) =>
          prev.map((item) =>
            item.history_id === user.history_id
              ? { ...item, feedback_state: "COMPLETE" }
              : item
          )
        );
      }
    } catch (error) {
      if (isAuthRequiredError(error)) return;
      console.error(error);
    }
  };
  return (
    <div className="ResultReview">
      <div className="ResultReview-text">
        <div className="ResultReview-text-top">
          <div className="ResultReview-text-username">
            {user.enemy_info.contact_id}
          </div>
          님에 대한
        </div>
        ComatchingAI의 매칭은 어떠셨나요?
      </div>
      <div className="ResultReview-star">
        <Rating
          name="read-only"
          value={score}
          precision={1}
          onChange={(event, newValue) => {
            setScore(newValue);
          }}
          sx={{ "& .MuiSvgIcon-root": blackStarStyles }}
        />
      </div>
      <button className="ResultReview-button" onClick={handleReviewSubmit}>
        전송
      </button>
    </div>
  );
}

export default ResultReview;
