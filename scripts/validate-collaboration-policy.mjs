#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "test",
  "chore",
  "ci",
  "perf",
  "build",
  "revert",
];

const BRANCH_TYPES = [...TYPES, "hotfix", "release"];
const NOMINAL_ENDINGS = [
  "구현",
  "수정",
  "개선",
  "정리",
  "삭제",
  "추가",
  "변경",
  "대응",
  "분리",
  "연동",
  "설정",
  "보완",
  "마이그레이션",
];

const TITLE_PATTERN = new RegExp(
  `^(${TYPES.join("|")})(\\([a-zA-Z0-9._/-]+\\))?: .+ (${NOMINAL_ENDINGS.join("|")})$`,
);
const BRANCH_PATTERN = new RegExp(
  `^(${BRANCH_TYPES.join("|")})/[a-z0-9._-]+$`,
);
const FORMAL_ENDING_PATTERN =
  /(합니다|했습니다|됩니다|되었습니다|드립니다|부탁드립니다|바랍니다|주세요|주십시오|습니다|입니다|니다)/;
const REQUIRED_BODY_SECTIONS = [
  "## 이슈",
  "## 변경 요약",
  "## 검증",
  "## BE 영향",
];

function fail(message) {
  console.error(`오류: ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function git(args) {
  return execSync(`git ${args}`, { encoding: "utf8" }).trim();
}

function getCurrentBranch() {
  return git("branch --show-current");
}

function getEnv(name) {
  return process.env[name]?.trim() ?? "";
}

function validateKoreanText(label, value) {
  assert(/[가-힣]/.test(value), `${label} 한국어 작성 필요`);
}

function validateNominalText(label, value) {
  assert(
    !FORMAL_ENDING_PATTERN.test(value),
    `${label} 격식체 종결어 제거 필요`,
  );
}

function validateTitle(title) {
  assert(title.length > 0, "PR 제목 입력 필요");
  validateKoreanText("PR 제목", title);
  validateNominalText("PR 제목", title);
  assert(
    TITLE_PATTERN.test(title),
    `PR 제목 형식 필요: "feat: 매칭 결과 화면 구현"`,
  );
}

function validateBranchName(branch) {
  if (branch === "main" || branch === "develop") return;

  assert(
    BRANCH_PATTERN.test(branch),
    `브랜치 이름 형식 필요: "${BRANCH_TYPES.join("|")}/short-description"`,
  );
}

function validateBranchFlow(baseRef, headRef) {
  assert(
    baseRef === "develop" || baseRef === "main",
    "PR 대상 브랜치는 develop 또는 main만 허용",
  );

  if (baseRef === "main") {
    assert(headRef === "develop", "main 대상 PR은 develop 브랜치에서만 생성");
    return;
  }

  validateBranchName(headRef);
}

function validateBody(body) {
  assert(body.length > 0, "PR 본문 입력 필요");
  validateKoreanText("PR 본문", body);
  validateNominalText("PR 본문", body);

  for (const section of REQUIRED_BODY_SECTIONS) {
    assert(body.includes(section), `PR 본문 필수 섹션 누락: ${section}`);
  }
}

function validateFirebaseDependency() {
  const packageJsonPath = resolve("package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  assert(!dependencies.firebase, "Firebase 의존성 추가 금지");
  assert(!dependencies["@firebase/app"], "Firebase 의존성 추가 금지");
}

function validateBranchMode() {
  const branch = getCurrentBranch();
  validateBranchName(branch);
  validateFirebaseDependency();
}

function validatePrMode() {
  const title = getEnv("PR_TITLE");
  const body = getEnv("PR_BODY");
  const baseRef = getEnv("BASE_REF");
  const headRef = getEnv("HEAD_REF");

  validateTitle(title);
  validateBranchFlow(baseRef, headRef);
  validateBody(body);
  validateFirebaseDependency();
}

const mode = process.argv[2] ?? "branch";

if (mode === "branch") {
  validateBranchMode();
} else if (mode === "pr") {
  validatePrMode();
} else {
  fail("검증 모드는 branch 또는 pr만 허용");
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("협업 정책 확인 완료");
