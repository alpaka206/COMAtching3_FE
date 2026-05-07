// @ts-nocheck
import * as styles from "../css/components/FormTitle.css.ts";

function FormTitle() {
  return (
    <div className={styles.formTitle}>
      <div className={styles.formTitleFirstText}>거의 다 왔습니다!</div>
      <div className={styles.formTitleSecondText}>
        모든 정보가 맞는지 확인해 주세요
      </div>
    </div>
  );
}

export default FormTitle;
