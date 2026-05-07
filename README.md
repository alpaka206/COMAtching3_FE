# COMAtching3 FE

COMAtching 프론트엔드 저장소.

## 개발 환경

- Node.js 20 사용
- 패키지 매니저는 npm 사용
- 기존 QR 라이브러리 peer dependency 충돌 때문에 `.npmrc`의 `legacy-peer-deps=true` 기준으로 설치
- Firebase 배포 설정 사용 안 함

```bash
npm ci
npm run dev
```

## 검증

```bash
npm run build
npm run lint
```

현재 린트는 레거시 코드 복구를 위해 경고 중심으로 운영.

## 브랜치 흐름

기본 흐름은 `main -> develop -> 이슈 브랜치`.

- 기능/수정 작업은 `develop`에서 이슈 브랜치 생성
- 작업 PR은 이슈 브랜치에서 `develop`으로 생성
- 배포 PR만 `develop`에서 `main`으로 생성

## 작성 규칙

- 커밋/PR/이슈 제목은 한국어 명사형 사용
- 예시: `feat: 매칭 결과 화면 구현`
- 예시: `fix: 로그인 리다이렉트 오류 수정`
- 자세한 규칙은 [CONTRIBUTING.md](./CONTRIBUTING.md) 확인
