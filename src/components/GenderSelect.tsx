// @ts-nocheck
import { Fragment } from "react";
import GenderButton from "./GenderButton";
import * as styles from "../css/components/GenderSelect.css.ts";

function GenderSelect({ user, setUser, setIsGenderSelected  }) {
  const handleGenderSelection = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: value,
    }));
    setIsGenderSelected(true);
  };

  return (
    <Fragment>
      <h3>성별</h3>
      <div className={styles.genderContainer}>
        <GenderButton
          isActive={user.gender === "남자"}
          value="남자"
          onClick={() => handleGenderSelection("남자")}
          label="남자"
        />
        <GenderButton
          isActive={user.gender === "여자"}
          value="여자"
          onClick={() => handleGenderSelection("여자")}
          label="여자"
        />
      </div>
    </Fragment>
  );
}

export default GenderSelect;
