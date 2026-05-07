// @ts-nocheck
import { useState, useEffect } from "react";
import HeaderNav from "../components/HeaderNav";

const Loading = () => {
  const [offset, setOffset] = useState(-100);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset < 100 ? prevOffset + 1 : -100));
    }, 15);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <HeaderNav />
      <div className="circle-icon">💟</div>
      <div className="content">
        <div className="LoadingText">
          코매칭 AI가 입력하신 결과를 바탕으로 <br />
          비슷한 매칭 상대를 찾고 있어요..
        </div>
        <div className="LoadingBar">
          <div
            className="GradientBar firstloadingbar"
            style={{ backgroundPosition: `${offset}% 0` }}
          />
          <div
            className="GradientBar secondloadingbar"
            style={{ backgroundPosition: `${offset}% 0` }}
          />
          <div
            className="GradientBar thirdloadingbar"
            style={{ backgroundPosition: `${offset}% 0` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
