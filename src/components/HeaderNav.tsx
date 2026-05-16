// @ts-nocheck
import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderNav.css";

function HeaderNav() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div>
        <img
          className={styles.logoImg}
          src="/assets/logoblack.svg"
          alt="로고"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

export default HeaderNav;
