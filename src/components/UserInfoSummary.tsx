// @ts-nocheck
import { Fragment, useRef, useState } from "react";
import { useUserValue } from "../store/appStore";
import * as styles from "../css/components/UserInfoSummary.css.ts";
import UserInfoContainer from "./UserInfoContainer";
function UserInfoSummary() {
  const userInfo = useUserValue();
  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isInstagram = userInfo.contact_id && userInfo.contact_id.startsWith("@");

  const scroll = (pageIndex) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth * pageIndex;
      setCurrentPage(pageIndex);
    }
  };

  return (
    <Fragment>
      
      <div className={styles.userInfoSummary}>
        {currentPage > 0 && (
          <div
            className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
            onClick={() => scroll(currentPage - 1)}
          >
            ◀
          </div>
        )}
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.sliderPage}>
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={userInfo.major}
              SecondTopic="나이"
              SecondText={userInfo.age}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={userInfo.song}
              SecondTopic="MBTI"
              SecondText={userInfo.mbti}
            />
          </div>
          <div className={`${styles.sliderPage} ${styles.sliderPageSecond}`}>
            <UserInfoContainer FirstTopic="취미" FirstText={userInfo.hobby} />
            <UserInfoContainer
              FirstTopic="나를 표현하는 한마디"
              FirstText={userInfo.comment}
              SecondTopic="연락빈도"
              SecondText={userInfo.contact_frequency}
            />
          </div>
        </div>
        {currentPage < 1 && (
          <div
            className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
            onClick={() => scroll(currentPage + 1)}
          >
            ▶
          </div>
        )}
        <div className={styles.userContact}>
          <div>
            <span>{isInstagram ? "InstagramID : " : "KakaoTalkID : "}</span>
            <span> {userInfo.contact_id}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoSummary;
