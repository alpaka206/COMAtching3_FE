// @ts-nocheck
import { Fragment } from "react";
import ContactMethodInput from "./ContactMethodInput";
import ContactMethodPick from "./ContactMethodPick";
import * as styles from  "../css/components/ContactMethod.css.ts";

function ContactMethod({ user, handleChange, setIsContactVerified,setUser  }) {
  return (
    <Fragment>
      <ContactMethodPick user={user} setUser={setUser} />

      <ContactMethodInput
        user={user}
        setUser={setUser}
        handleChange={handleChange}
        setIsContactVerified={setIsContactVerified}
        // onContactVerified={onContactVerified}
      />
      {!user.contact_id_Verified && (
        <h6 className={styles.checkMessage}>
          중복입력 방지를 위해 확인버튼을 눌러주세요
        </h6>
      )}
    </Fragment>
  );
}

export default ContactMethod;
