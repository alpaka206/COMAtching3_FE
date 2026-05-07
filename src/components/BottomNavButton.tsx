// @ts-nocheck
import * as styles from "../css/components/BottomNavButton.css";

function BottomNavButton({ onClick, imgSrc, imgText, buttonText }) {
  return (
    <button className={styles.bottomNavButton} onClick={onClick}>
      <img src={import.meta.env.VITE_PUBLIC_URL + imgSrc} alt={imgText} className={styles.img} />
      {buttonText}
    </button>
  );
}
export default BottomNavButton;
