// @ts-nocheck
// 미국 시간을 한국 시간으로 변환하는 함수(백엔에서 시간을 미국 시간으로 줍니다.)
export default function convertUSToKST({ USDate }) {
  // 미국 시간을 UTC로 변환
  var UTCDate = new Date(USDate);
  // UTC에 16시간 (9시간: 미국과 한국의 시차 + 7시간: 미국과 UTC의 시차)을 더하여 한국 시간으로 변환
  var KSTDate = new Date(UTCDate.getTime() + 9 * 60 * 60 * 1000);
  return KSTDate;
}
