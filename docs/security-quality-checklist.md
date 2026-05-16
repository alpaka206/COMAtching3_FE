# 보안/품질 점검표

## 보안

- 사용자 입력을 `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`으로 처리하지 않음
- 외부 이동 URL은 허용된 출처 또는 현재 페이지 기준으로만 생성
- 인증 토큰은 URL에 남기지 않고 처리 후 `replaceState` 또는 라우팅으로 제거
- 쿠키 저장 시 `sameSite=lax`, HTTPS 환경 `secure` 옵션 유지
- CSRF 영향이 있는 쿠키 인증 API 변경 시 BE 확인 필요
- 로그, alert, PR 본문에 토큰/개인정보 노출 없음
- `target="_blank"` 사용 시 `rel="noopener noreferrer"` 지정
- API 오류 로그는 상태 코드와 흐름 중심으로 기록하고 원문 토큰/개인정보 출력 금지
- 새 의존성 추가 시 `npm audit --omit=dev --audit-level=moderate` 결과 확인
- 인증 실패 처리는 `clearAuthTokens`와 홈 이동 흐름 유지

## 성능

- 첫 화면에 필요 없는 화면은 `dynamic(..., { ssr: false })` 또는 라우트 단위 분리
- 무거운 이미지에는 WebP/AVIF 변환 또는 Next 이미지 최적화 검토
- 반복되는 애니메이션/드래그는 `transform` 기반 처리
- 빈번한 포인터 이동 상태 업데이트는 `requestAnimationFrame` 기준 처리
- 레이아웃 계산을 유발하는 `top/left/width/height` 반복 변경 지양
- 대형 SVG/PNG는 실제 사용 화면 기준 압축 또는 대체 이미지 검토
- 라우트 전용 컴포넌트는 해당 라우트 `_components`에 배치해 공유 번들 혼입 최소화
- 여러 화면 공통 계산은 `src/features` 또는 `src/hooks`로 분리해 중복 렌더링 로직 축소
- `window.location.reload()` 대신 상태 갱신 또는 라우터 갱신 우선 검토
- 포인터/드래그 이벤트는 `transform`, `requestAnimationFrame`, `touch-action` 기준 확인

## 접근성과 흐름

- 버튼은 `type="button"` 지정
- 아이콘 이미지에는 의미 있는 `alt` 또는 장식용 빈 `alt` 사용
- 로그인/권한 만료 시 홈으로 복귀하고 토큰 정리
- 실패 상태, 빈 상태, 로딩 상태 확인
- 모바일 화면에서 텍스트 겹침과 버튼 터치 영역 확인
- 클릭 가능한 이미지는 가능하면 `<button>` 또는 `<a>` 안에 배치
- 빈 파일, 사용하지 않는 컴포넌트, 죽은 CSS import 제거
- route-only 컴포넌트를 `src/components`에 남기지 않음

## 코드 품질

- `@ts-nocheck` 신규 추가 금지, 기존 파일 수정 시 제거 가능성 검토
- 컴포넌트명과 파일명은 PascalCase, 훅은 `use*`, 일반 함수는 camelCase 기준
- `FormData`, `Info`, `MatchState`처럼 브라우저 API 또는 타입처럼 보이는 지역 변수명 지양
- API 요청 payload는 `requestPayload`, 응답 상태는 `resultData`처럼 역할이 드러나는 이름 사용
- 한 파일이 API 호출, 폼 상태, 표시 컴포넌트, 계산 로직을 모두 가진 경우 helper/hook/route component로 분리 검토

## PR 기록

PR 본문 `보안/품질 확인`에 영향 없음 또는 확인 필요 항목 기록.
성능 영향이 있는 화면 변경은 Lighthouse 결과 또는 수동 확인 결과 기록.
