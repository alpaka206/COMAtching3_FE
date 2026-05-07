// @ts-nocheck
// UserInfoListItem.js

const UserInfoListItem = ({
  email,
  pickMe,
  pickSomeone,
  pickMeIncrement,
  pickMeDecrement,
  pickSomeoneIncrement,
  pickSomeoneDecrement,
  onConfirmClick,
}) => {
  return (
    <div className="userInfoList_body">
      <h3>{email}</h3>
      <div className="pickMebuttonList">
        <button onClick={pickMeIncrement}>+</button>
        <h1>{pickMe}</h1>
        <button onClick={pickMeDecrement}>-</button>
      </div>
      <div className="pickMebuttonList">
        <button onClick={pickSomeoneIncrement}>+</button>
        <h1>{pickSomeone}</h1>
        <button onClick={pickSomeoneDecrement}>-</button>
      </div>
      <h3 onClick={onConfirmClick}>확인</h3>
      <h3>삭제</h3>
    </div>
  );
};

export default UserInfoListItem;
