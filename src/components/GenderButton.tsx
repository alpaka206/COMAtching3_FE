// @ts-nocheck
import * as styles from "../css/components/GenderButton.css.ts";

function GenderButton({ isActive, value, onClick, label }) {
  return (
    <button
      type="button"
      className={`${styles.genderButton} ${isActive ? "" : styles.inactive}`}
      value={value}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default GenderButton;
