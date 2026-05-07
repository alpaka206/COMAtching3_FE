// @ts-nocheck
import ContactMethodButton from "./ContactMethodButton";
import * as styles from "../css/components/ContactMethodPick.css.ts";

function ContactMethodPick({ user, setUser }) {
  const handleContactMethod = (method) => {
    setUser((prev) => ({
      ...prev,
      contact: method,
    }));
  };

  return (
    <div className={styles.contactMethodPick}>
      <h3>연락처</h3>
      <div className={styles.space}>&nbsp;</div>
      <ContactMethodButton
        isActive={user.contact === "kakao"}
        onClick={() => handleContactMethod("kakao")}
        type="kakao"
        image={`${import.meta.env.VITE_PUBLIC_URL}../../assets/kakao.svg`}
        alt="카카오아이디"
      />
      <ContactMethodButton
        isActive={user.contact === "instagram"}
        onClick={() => handleContactMethod("instagram")}
        type="instagram"
        image={`${import.meta.env.VITE_PUBLIC_URL}../../assets/insta.svg`}
        alt="인스타그램"
      />
    </div>
  );
}

export default ContactMethodPick;
