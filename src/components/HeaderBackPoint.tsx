// @ts-nocheck
import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css";
import { ROUTES } from "../routes";

function HeaderBackPoint({ currentPoint }) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
       <button className={styles.left} type="button" onClick={() => navigate(ROUTES.home)}>
                <img src="/assets/backimg.svg" alt="" className={styles.pointImage} />
                <span className={styles.spanText}>돌아가기</span>
                
        </button>
        <button className={styles.right} type="button" onClick={() => navigate(ROUTES.charge)}>
                <img src="/assets/point.svg" alt="point" className={styles.pointImage} />
                <span className={styles.spanText}>{ currentPoint }p</span>
                <img src="/assets/headertoggle.svg" alt="toggle" className={styles.toggleImage} />
        </button>
    </div>
  );
}
export default HeaderBackPoint;
