// @ts-nocheck
import { ageButton, active } from "@/css/components/AgeButton.css.ts";

function AgeButton({ formData, value, onClick, isClickable, text }) {
  const isActive = formData === value;

  const handleClick = () => {
    if (isClickable) {
      onClick(value);
      
    }
  };

  return (
    <button
      type="button"
      className={`${ageButton} ${isClickable ? (isActive ? active : '') : ''}`}
      value={value}
      onClick={handleClick}
      disabled={!isClickable}
    >
      {text}
    </button>
  );
}

export default AgeButton;
