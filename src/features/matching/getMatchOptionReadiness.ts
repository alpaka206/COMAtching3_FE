import type { MatchPickState } from "@/store/appStore";

import type { MatchOptionReadiness } from "./types";

export function getMatchOptionReadiness(
  matchState: MatchPickState,
  isMbtiSelected: boolean
): MatchOptionReadiness {
  const isAgeSelected = matchState.isUseOption[0]
    ? (matchState.formData.ageOption || "") !== ""
    : true;
  const isContactFrequencySelected = matchState.isUseOption[1]
    ? (matchState.formData.contactFrequencyOption || "") !== ""
    : true;
  const isHobbySelected = matchState.isUseOption[2]
    ? (matchState.formData.hobbyOption || []).length > 0
    : true;

  return {
    isAgeSelected,
    isContactFrequencySelected,
    isHobbySelected,
    isSubmitEnabled:
      isMbtiSelected &&
      isAgeSelected &&
      isContactFrequencySelected &&
      isHobbySelected,
  };
}
