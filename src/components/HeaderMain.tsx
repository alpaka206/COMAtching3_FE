// @ts-nocheck
import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css";

function HeaderMain() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.logoButton}
        onClick={() => navigate("/")}
        aria-label="홈으로 이동"
      >
        <img
          className={styles.logoImg}
          src="/assets/logoblacknav.webp"
          alt=""
          width="140"
          height="40"
          decoding="async"
        />
      </button>
    </div>
  );
}

export default HeaderMain;
