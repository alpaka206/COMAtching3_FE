# COMAtching3 FE

COMAtching 프론트엔드 저장소.

## 개발 환경

- Next.js App Router + TypeScript 기반
- Node.js 20 사용
- 패키지 매니저는 npm 사용
- 기존 QR 라이브러리 peer dependency 충돌 때문에 `.npmrc`의 `legacy-peer-deps=true` 기준 설치
- Firebase 배포 설정 사용 안 함

```bash
npm ci
npm run dev
```

## 검증

```bash
npm run policy:branch
npm run lint
npm run build
npm test
npm run test:smoke
npm audit --omit=dev --audit-level=moderate
```

린트는 경고 없이 통과하는 상태 유지.

## 라우팅 구조

- `src/app`: Next.js App Router 라우트
- `src/app/<route>/_components`: 라우트 전용 클라이언트 화면, 섹션, 보조 컴포넌트
- `src/components`: 두 개 이상 라우트에서 공유하는 UI 컴포넌트
- `src/hooks`: 공용 React Hook
- `src/features`: 도메인별 기능 로직, 계산 함수, 테스트
- `src/app/providers.tsx`: 공통 클라이언트 Provider와 브라우저 외부 열기 처리
- `src/lib/react-router-dom.tsx`: 기존 `react-router-dom` 사용처를 Next 라우터로 연결하는 호환 레이어

브라우저 전용 화면은 `dynamic(..., { ssr: false })` 기준으로 연결.

## 브랜치 흐름

기본 흐름은 `main -> develop -> 이슈 브랜치`.

- 기능/수정 작업은 `develop`에서 이슈 브랜치 생성
- 작업 PR은 이슈 브랜치에서 `develop`으로 생성
- 배포 PR만 `develop`에서 `main`으로 생성

## 작성 규칙

- 커밋/PR/이슈 제목은 한국어 명사형 사용
- 예시: `feat: 매칭 결과 화면 구현`
- 예시: `fix: 로그인 리다이렉트 오류 수정`
- `합니다`, `했습니다`, `됩니다` 같은 격식체 종결 사용 금지
- 자세한 규칙은 [CONTRIBUTING.md](./CONTRIBUTING.md) 확인
- 협업 운영 규칙은 [docs/collaboration.md](./docs/collaboration.md) 확인
- 보안/품질 점검표는 [docs/security-quality-checklist.md](./docs/security-quality-checklist.md) 확인
- 보안 신고 기준은 [SECURITY.md](./SECURITY.md) 확인
