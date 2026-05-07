import { describe, expect, it } from "vitest";

import type { MatchPickState } from "../../store/appStore";
import { createMatchRequestPayload } from "./createMatchRequestPayload";

const createMatchState = (
  overrides: Partial<MatchPickState> = {}
): MatchPickState => ({
  selectedMBTI: ["E", "N", "F", "P"],
  selectedCategory: ["movie", "music"],
  point: 1_000,
  balance: 2_000,
  isUseOption: [true, true, true, true],
  formData: {
    ageOption: "SAME",
    mbtiOption: "ENFP",
    hobbyOption: ["movie"],
    contactFrequencyOption: "OFTEN",
    sameMajorOption: true,
  },
  ...overrides,
});

describe("createMatchRequestPayload", () => {
  it("선택한 매칭 옵션을 API 요청 형태로 변환", () => {
    expect(createMatchRequestPayload(createMatchState())).toEqual({
      ageOption: "SAME",
      mbtiOption: "E,N,F,P",
      hobbyOption: ["movie"],
      contactFrequencyOption: "OFTEN",
      sameMajorOption: true,
    });
  });

  it("사용하지 않는 유료 옵션을 UNSELECTED로 변환", () => {
    const payload = createMatchRequestPayload(
      createMatchState({
        selectedMBTI: ["I", "X", "T", "J"],
        isUseOption: [false, false, false, false],
        formData: {},
      })
    );

    expect(payload).toEqual({
      ageOption: "UNSELECTED",
      mbtiOption: "I,T,J",
      hobbyOption: ["UNSELECTED"],
      contactFrequencyOption: "UNSELECTED",
      sameMajorOption: false,
    });
  });
});
