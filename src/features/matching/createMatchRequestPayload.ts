import type { MatchPickState } from "../../store/appStore";
import type { MatchRequestPayload } from "./types";

export function createMatchRequestPayload(
  matchState: MatchPickState
): MatchRequestPayload {
  return {
    ageOption: matchState.isUseOption[0]
      ? matchState.formData.ageOption || ""
      : "UNSELECTED",
    mbtiOption: matchState.selectedMBTI
      .filter((letter) => letter !== "X")
      .join(","),
    hobbyOption: matchState.isUseOption[2]
      ? matchState.formData.hobbyOption || []
      : ["UNSELECTED"],
    contactFrequencyOption: matchState.isUseOption[1]
      ? matchState.formData.contactFrequencyOption || ""
      : "UNSELECTED",
    sameMajorOption: matchState.isUseOption[3],
  };
}
