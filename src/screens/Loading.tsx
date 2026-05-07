import HeaderNav from "../components/HeaderNav";

const Loading = () => {
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
          <div className="GradientBar firstloadingbar" />
          <div className="GradientBar secondloadingbar" />
          <div className="GradientBar thirdloadingbar" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
