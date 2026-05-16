// @ts-nocheck
import { useState } from "react";
import {
  adminRequestListContainer,
  adminRequestListElement,
  adminRequestListItem,
  adminRequestListElementMargin,
  adminRequestListItemImg,
  adminRequestListItemInput,
  adminRequestListElementUserID,
  adminRequestListElementUserIDID,
  adminRequestListElementResultPoint,
  adminRequestListElementContainer,
  buttonMarginRight,
  chargeDeleteButton,
  formattedDateStyle
} from "../_styles/AdminChargeRequestItem.css.ts"; // 스타일 파일 import
import pointIcon from "../../../../../public/assets/point.svg";

function FormattedDate({ isoDate }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    
  };

  return (
    <div>{formatDate(isoDate)}</div>
  );
}
function AdminChargeRequestItem({ request, handleAction}) {
  const [value, setValue] = useState({
    add_point:  request.requestAmount,
    chargeCheck: false,
    result_point:  request.existingPoints,
  });

  // 충전 확인 함수
  const handleChargeIncrease = () => {
    handleAction(request.userId, value.add_point, 'approve');
    setValue(prevState => ({
      ...prevState,
      result_point: prevState.result_point + prevState.add_point,
      chargeCheck: true,
    }));
  };

  // "요청 삭제" 버튼에 삭제 로직 적용
  const handleChargeDelete = () => {
    handleAction(request.userId, request.requestAmount, 'cancel');
  };

  

  // 입력값 변경 핸들러
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // 숫자 이외의 문자 및 마이너스 기호 제거
    const sanitizedValue = inputValue.replace(/[^0-9]/g, "");

    setValue((prevState) => ({
      ...prevState,
      add_point: sanitizedValue === "" ? 0 : parseInt(sanitizedValue),
    }));
  };

  return (
    <div className={adminRequestListContainer}>
      <div className={`${adminRequestListElement} ${adminRequestListElementMargin}`}>
        <div className={adminRequestListElementUserID}>
          userID: &nbsp;
          <div className={adminRequestListElementUserIDID}>
            {request.username}
          </div>
          
          
        </div>
        <div className={adminRequestListElementContainer}>
          <span className={adminRequestListElementResultPoint}>
            총 잔액 : {request.existingPoints}
          </span>
          <button className={chargeDeleteButton} onClick={handleChargeDelete}>요청 삭제</button>
        </div>
        
      </div>

      <div className={adminRequestListItem}>
        <img
          src={pointIcon}
          alt="cost"
          className={adminRequestListItemImg}
        />
        <p className={adminRequestListElementUserIDID}> 입금액</p>
        <input
          type="number"
          value={value.add_point}
          onChange={handleInputChange}
          disabled={value.chargeCheck}
          className={adminRequestListItemInput}
        />
        <button onClick={handleChargeIncrease} className={buttonMarginRight}>적용</button>
        <div  className={formattedDateStyle}>
          
          <FormattedDate isoDate={request.createdAt} />
        </div>
      </div>
    </div>
  );
}

export default AdminChargeRequestItem;
