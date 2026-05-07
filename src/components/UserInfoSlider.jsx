// import React from "react";
import UserInfoContainer from "./UserInfoContainer";

function UserInfoSlider({ leftBoxData, rightBoxData }) {
  return (
    <div className="info-box-slider">
      <div className="left-box">
        {leftBoxData.map((data, index) => (
          <div key={index} className="slider-item">
            <UserInfoContainer
              FirstTopic={data.FirstTopic}
              FirstText={data.FirstText}
              SecondTopic={data.SecondTopic}
              SecondText={data.SecondText}
            />
          </div>
        ))}
      </div>
      <div className="right-box">
        {rightBoxData.map((data, index) => (
          <div key={index} className="slider-item">
            <UserInfoContainer
              FirstTopic={data.FirstTopic}
              FirstText={data.FirstText}
              SecondTopic={data.SecondTopic}
              SecondText={data.SecondText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserInfoSlider;
