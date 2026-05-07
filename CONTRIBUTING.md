# 기여 규칙

## 작업 흐름

1. `main`은 운영 기준 브랜치로 유지.
2. `develop`은 통합 개발 브랜치로 사용.
3. 모든 작업은 `develop`에서 이슈 브랜치를 생성.
4. 작업 완료 후 이슈 브랜치에서 `develop`으로 PR 생성.
5. 배포 준비가 끝나면 `develop`에서 `main`으로 PR 생성.

```bash
git switch develop
git pull origin develop
git switch -c feat/example-feature
```

## 브랜치 이름

브랜치 이름은 `<type>/<short-description>` 형식 사용.

- `feat/matching-result`
- `fix/login-redirect`
- `docs/readme-update`
- `chore/github-settings`

## 커밋 제목

커밋은 Conventional Commits 형식 사용.

```text
<type>: <작업 내용> <명사형 작업>
```

예시:

- `feat: 매칭 결과 화면 구현`
- `fix: 카카오 로그인 리다이렉트 수정`
- `docs: 개발 흐름 문서 정리`
- `chore: Firebase 설정 삭제`

## 이슈 제목

이슈 제목도 작업 성격과 결과가 보이도록 작성.

- `feat: 매칭 신청 화면 구현`
- `fix: 관리자 충전 승인 오류 수정`
- `chore: 개발 환경 설정 정리`

## PR 제목

PR 제목은 커밋 제목과 같은 규칙 사용.

- `feat: 매칭 신청 화면 구현`
- `fix: 관리자 충전 승인 오류 수정`
- `chore: GitHub 협업 설정 정리`

## PR 체크

- 대상 브랜치가 `develop`인지 확인.
- 배포 PR만 대상 브랜치를 `main`으로 설정.
- `main` 대상 PR의 출발 브랜치는 `develop`만 허용.
- BE API 변경, 응답 형식 변경, 인증 정책 변경이 있으면 PR 본문에 기록.
- Firebase 관련 설정이나 의존성 재추가 금지.

## 로컬 실행

```bash
npm ci
npm run dev
npm run build
npm run lint
```

기존 QR 라이브러리의 React peer dependency 충돌 때문에 npm 설치는 `.npmrc` 기준 사용.
현재 린트는 레거시 코드 복구를 위해 경고 중심으로 운영.
