# 에이전트 작업 규칙

## 기본 원칙

- 모든 응답, 이슈, PR 설명은 한국어로 작성.
- 문장 끝은 `구현`, `수정`, `정리`, `확인`처럼 명사형으로 작성.
- `합니다`, `했습니다` 같은 격식체 종결은 사용하지 않음.
- 작업자나 도구 이름을 드러내는 태그를 제목/본문에 남기지 않음.
- Firebase는 사용하지 않으므로 새 의존성, 설정, 배포 문서 추가 금지.
- BE는 별도 개발자가 담당하므로 API 계약 변경이 필요하면 PR 본문에 명확히 기록.

## 브랜치 전략

- 기본 흐름은 `main -> develop -> 이슈 브랜치`.
- 기능/수정 작업은 항상 `develop`에서 새 브랜치를 생성.
- 이슈 브랜치 예시:
  - `feat/matching-result`
  - `fix/login-redirect`
  - `chore/project-settings`
- 일반 작업 PR 대상은 항상 `develop`.
- 배포 준비 PR만 `develop -> main`으로 생성.

## 커밋 규칙

- 커밋 제목은 Conventional Commits 형식 사용.
- 형식: `<type>: <작업 내용> <명사형 작업>`
- 예시:
  - `feat: 매칭 결과 화면 구현`
  - `fix: 로그인 리다이렉트 오류 수정`
  - `chore: GitHub 협업 설정 정리`
- 주요 type:
  - `feat`: 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `style`: 스타일 수정
  - `refactor`: 리팩터링
  - `test`: 테스트 추가/수정
  - `chore`: 설정/빌드 보조 작업
  - `ci`: GitHub Actions 등 CI 설정

## PR 규칙

- PR 제목도 커밋 제목과 같은 형식 사용.
- PR 본문에 이슈 번호, 변경 요약, 검증 결과, BE 영향 여부 기록.
- PR 대상 브랜치가 `develop`인지 확인.
- `main` 대상 PR은 `develop` 브랜치에서만 생성.

## 로컬 검증

- 의존성 설치: `npm ci`
- 개발 서버: `npm run dev`
- 빌드 확인: `npm run build`
- 린트 확인: `npm run lint`
- 기존 QR 라이브러리 peer dependency 충돌 때문에 `.npmrc`의 `legacy-peer-deps=true` 유지.
- 현재 린트는 레거시 코드 복구를 위해 경고 중심으로 운영.
