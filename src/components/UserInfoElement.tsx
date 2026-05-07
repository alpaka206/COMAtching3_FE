// @ts-nocheck
import { Fragment } from "react";
import * as styles from "../css/components/UserInfoElement.css.ts";

function UserInfoElement({ Topic, Text }) {
  return (
    <Fragment>
      <div className={styles.userInfoElementTopic}>{Topic}</div>
      <div className={styles.userInfoElementText}>
        {Array.isArray(Text) ? (
          <div className={styles.userInfoElementItems}>
            {Text.map((item, index) => (
              <Fragment key={index}>
                <span className={styles.userInfoElementItem}>{item}</span>
                {index !== Text.length - 1 && ","}
              </Fragment>
            ))}
          </div>
        ) : (
          Text
        )}
      </div>
    </Fragment>
  );
}

export default UserInfoElement;
