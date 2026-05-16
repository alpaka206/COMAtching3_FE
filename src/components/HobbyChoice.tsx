// @ts-nocheck
import React from "react";

function HobbyChoice({ index, hobby, pickHobby, handleHobbyClick }) {
  return (
    <button
      key={index}
      className={`hobby-item ${
        pickHobby.hobby.includes(hobby.label) ? "selected" : ""
      }`}
      onClick={() => handleHobbyClick(hobby.label)}
    >
      <img src={hobby.image} alt={hobby.alt} loading="lazy" decoding="async" />
      <div>{hobby.label}</div>
    </button>
  );
}

export const MemoizedHobbyChoice = React.memo(HobbyChoice);
export default MemoizedHobbyChoice;
