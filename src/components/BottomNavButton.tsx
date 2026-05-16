// @ts-nocheck
import * as styles from "../css/components/BottomNavButton.css";

function BottomNavButton({ onClick, imgSrc, imgText, buttonText }) {
  return (
    <button className={styles.bottomNavButton} type="button" onClick={onClick}>
      <img src={imgSrc} alt={imgText} className={styles.img} loading="lazy" decoding="async" />
      {buttonText}
    </button>
  );
}
export default BottomNavButton;
