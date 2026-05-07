// @ts-nocheck
import { Fragment } from "react";
import * as styles from "../css/components/LoginUserInfoTop.css.ts";

function LoginUserInfoTop({ username }) {
  return (
    <Fragment>
      <div className={styles.welcomeMessage}>
        {username}님,
        <br />
        환영합니다.
      </div>
    </Fragment>
  );
}

export default LoginUserInfoTop;
