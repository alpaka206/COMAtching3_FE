/**
 * 매칭 요청 전 유효성을 검사하는 함수
 * @param {Object} MatchState - 매칭 상태 정보 객체
 * @param {Object} updatedFormData - 업데이트된 폼 데이터 객체
 * @returns {boolean} - 유효성 여부
 */

export const matchValidation = (MatchState, updatedFormData) => {
  const mbti = updatedFormData.mbti;
  const xCount = (mbti.match(/X/g) || []).length;

  // MBTI가 하나만 선택되었는지 확인
  if (xCount >= 3) {
    alert("mbti를 두개 골라주세요");
    return false;
  }

  // MBTI가 하나만 선택되었는지 확인
  if (MatchState.isUseOption[0] && updatedFormData.age_option === "") {
    alert("나이를 골라주세요");
    return false;
  }

  // 연락 빈도 옵션 선택 확인
  if (
    MatchState.isUseOption[1] &&
    updatedFormData.contact_frequency_option === ""
  ) {
    alert("연락 빈도를 골라주세요");
    return false;
  }

  // 취향 옵션 선택 확인
  if (MatchState.isUseOption[2] && updatedFormData.hobby_option.length < 1) {
    alert("취향을 골라주세요");
    return false;
  }

  // 잔여 포인트가 부족한지 확인
  if (MatchState.balance < MatchState.point) {
    alert("돈이 부족합니다");
    return false;
  }

  return true; // 모든 유효성 검사를 통과하면 true 반환
};
