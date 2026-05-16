// @ts-nocheck
import * as styles from "../css/components/MyInfoButton.css";

function MyInfoButton({ imgSrc, infoText, buttonText ,handleCharge}) {
  return (
    <div className={styles.myInfoButton} onClick={handleCharge}>
      <div className={styles.textWrapper}>
        <div className={styles.buttonText}>{buttonText}</div>
        <div className={styles.valueText}>{infoText}</div>
      </div>
      <img
        className={styles.buttonImage}
        src={imgSrc}
        alt="이미지"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default MyInfoButton;
