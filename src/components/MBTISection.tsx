// @ts-nocheck
import PropTypes from "prop-types";
import * as styles from "../css/components/MBTISection.css.ts";
import MBTIButton from "./MBTIButton";

const BUTTON_LETTERS = ["E", "S", "T", "J", "I", "N", "F", "P"];

function MBTISection({ user, onClick, name }) {
  return (
    
    <div className={styles.mbtiSection}>
      
      <div className={styles.mbtiContainer}>
        {BUTTON_LETTERS.map((letter) => (
          <MBTIButton
            key={letter}
            user={user}
            onClick={onClick}
            letter={letter}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}

MBTISection.propTypes = {
  user: PropTypes.string.isRequired,  // 문자열로 수정
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default MBTISection;
