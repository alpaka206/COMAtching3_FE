# 보안/품질 점검표

## 보안

- 사용자 입력을 `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`으로 처리하지 않음
- 외부 이동 URL은 허용된 출처 또는 현재 페이지 기준으로만 생성
- 인증 토큰은 URL에 남기지 않고 처리 후 `replaceState` 또는 라우팅으로 제거
- 쿠키 저장 시 `sameSite=lax`, HTTPS 환경 `secure` 옵션 유지
- CSRF 영향이 있는 쿠키 인증 API 변경 시 BE 확인 필요
- 로그, alert, PR 본문에 토큰/개인정보 노출 없음

## 성능

- 첫 화면에 필요 없는 화면은 `dynamic(..., { ssr: false })` 또는 라우트 단위 분리
- 무거운 이미지에는 WebP/AVIF 변환 또는 Next 이미지 최적화 검토
- 반복되는 애니메이션/드래그는 `transform` 기반 처리
- 빈번한 포인터 이동 상태 업데이트는 `requestAnimationFrame` 기준 처리
- 레이아웃 계산을 유발하는 `top/left/width/height` 반복 변경 지양
- 대형 SVG/PNG는 실제 사용 화면 기준 압축 또는 대체 이미지 검토

## 접근성과 흐름

- 버튼은 `type="button"` 지정
- 아이콘 이미지에는 의미 있는 `alt` 또는 장식용 빈 `alt` 사용
- 로그인/권한 만료 시 홈으로 복귀하고 토큰 정리
- 실패 상태, 빈 상태, 로딩 상태 확인
- 모바일 화면에서 텍스트 겹침과 버튼 터치 영역 확인

## PR 기록

PR 본문 `보안/품질 확인`에 영향 없음 또는 확인 필요 항목 기록.
성능 영향이 있는 화면 변경은 Lighthouse 결과 또는 수동 확인 결과 기록.
