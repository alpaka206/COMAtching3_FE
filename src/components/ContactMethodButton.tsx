// @ts-nocheck
import * as styles from "../css/components/ContactMethodButton.css.ts";


function ContactMethodButton({ isActive, onClick, image, alt }) {
  return (
    <button
      type="button"
      className={`${styles.phonebutton} ${isActive ? styles.active : styles.inactive}`}
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={alt} 
        className={`${styles.contactMethodButtonImg} ${isActive ? styles.activeImg : ""}`}
      />
    </button>
  );
}

export default ContactMethodButton;
