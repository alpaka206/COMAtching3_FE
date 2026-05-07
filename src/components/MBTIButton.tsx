// @ts-nocheck
import PropTypes from "prop-types";
import * as styles from "../css/components/MBTIButton.css.ts";

function MBTIButton({ user, onClick, letter, name }) {
  const isActive = user.includes(letter);

  const handleClick = () => {
    onClick(letter);
  };

  return (
    <div className={styles.mbtiElement}>
      <button
        type="button"
        className={`${
          name === "form-MBTIButton" ? styles.formMbtiButton : styles.mbtiButton
        } ${
          isActive
            ? name === "form-MBTIButton"
              ? styles.formActiveButton
              : styles.activeButton
            : ""
        }`}
        onClick={handleClick}
      >
        {letter}
      </button>
    </div>
  );
}

MBTIButton.propTypes = {
  user: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  letter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MBTIButton;
