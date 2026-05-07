/**
 * 사용자가 입력한 정보를 유효성 검사하는 함수
 * @param {Object} user - 사용자 정보 객체
 * @param {Object} registerCheck - 개인정보 동의 체크 여부 객체
 * @returns {boolean} - 유효성 여부
 */

export const validateForm = (user, registerCheck) => {
  const AgeInt = parseInt(user.age, 10);

  // 개인정보 동의 체크 확인
  if (registerCheck.check === false) {
    alert("개인정보 동의를 체크해주세요");
    return false;
  }

  // 전공 선택 확인
  if (user.major.length < 1) {
    alert("전공을 선택하세요.");
    return false;
  }

  // 나이 유효성 검사
  if (isNaN(AgeInt) || AgeInt > 29 || AgeInt < 20) {
    alert("올바른 나이를 입력해주세요 (20부터 29까지 가능).");
    return false;
  }

  // 연락처 입력 확인
  if (user.contact_id.length < 1) {
    alert("연락처를 입력해주세요");
    return false;
  }

  // 연락처 중복 확인 체크 여부 확인
  if (user.contact_id_Verified === true) {
    alert("연락처 중복체크를 해주세요");
    return false;
  }

  // 연락빈도 선택 확인
  if (user.contact_frequency.length < 1) {
    alert("연락빈도를 골라주세요");
    return false;
  }

  // MBTI 모두 선택 확인
  if (user.mbti.length !== 4) {
    alert("MBTI를 모두 선택해주세요.");
    return false;
  }

  // 취미 선택 확인
  if (user.hobby.length < 1) {
    alert("취미를 최소 1개 이상 선택해주세요.");
    return false;
  }

  // 좋아하는 노래 입력 길이 확인
  if (user.song.length > 20 || user.song.length < 1) {
    alert("최대 20자 이내로 좋아하는 노래를 입력해주세요.");
    return false;
  }

  // 나를 소개할 한 마디 입력 길이 확인
  if (user.comment.length > 11 || user.comment.length < 1) {
    alert("나를 소개할 한마디를 11자 이내로 입력해주세요.");
    return false;
  }

  return true; // 모든 유효성 검사를 통과하면 true 반환
};
