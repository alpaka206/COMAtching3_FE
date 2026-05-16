# 협업 운영 규칙

## 브랜치 흐름

기본 흐름은 `main -> develop -> 이슈 브랜치`.

- `main`: 배포 기준 브랜치
- `develop`: 기능 통합 브랜치
- `type/short-description`: 실제 작업 브랜치

일반 PR은 `type/short-description -> develop` 기준.
배포 준비 PR만 `develop -> main` 기준.

## 작업 시작

```bash
git switch develop
git pull origin develop
git switch -c feat/matching-result
npm run policy:branch
```

## 브랜치 이름

허용 형식: `<type>/<short-description>`

- `feat/matching-result`
- `fix/login-redirect`
- `docs/readme-update`
- `chore/github-settings`
- `hotfix/auth-token`
- `release/2026-05-16`

## 제목 규칙

커밋, 이슈, PR 제목은 같은 형식 사용.

```text
<type>: <작업 내용> <명사형 작업>
```

허용 예시:

- `feat: 매칭 결과 화면 구현`
- `fix: 로그인 리다이렉트 오류 수정`
- `docs: 협업 운영 문서 정리`
- `ci: PR 정책 검사 보완`

금지 예시:

- `feat: 매칭 결과 화면 구현합니다`
- `fix login redirect`
- `작업 완료`

## PR 본문

필수 섹션:

- `## 이슈`
- `## 변경 요약`
- `## 검증`
- `## BE 영향`

추가로 보안/품질 확인 결과 기록.
API 요청/응답 변경이 있으면 BE 확인 필요 항목에 명확히 기록.

## 자동 검증

`PR 규칙 확인` 워크플로에서 다음 항목 검사.

- PR 대상 브랜치가 `develop` 또는 `main`인지 확인
- `main` 대상 PR 출발 브랜치가 `develop`인지 확인
- `develop` 대상 PR 출발 브랜치가 이슈 브랜치 형식인지 확인
- PR 제목이 Conventional Commits + 한국어 명사형인지 확인
- PR 본문 필수 섹션 존재 확인
- PR 제목/본문의 격식체 종결어 사용 방지
- Firebase 의존성 추가 방지

## 로컬 설정

커밋 메시지 템플릿 적용:

```bash
git config commit.template .gitmessage
```

검증 명령:

```bash
npm run policy:branch
npm run lint
npm run build
```
