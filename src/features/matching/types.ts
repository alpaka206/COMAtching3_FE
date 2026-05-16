export type MatchRequestPayload = {
  ageOption: string;
  mbtiOption: string;
  hobbyOption: unknown[];
  contactFrequencyOption: string;
  sameMajorOption: boolean;
};

export type MatchOptionReadiness = {
  isAgeSelected: boolean;
  isContactFrequencySelected: boolean;
  isHobbySelected: boolean;
  isSubmitEnabled: boolean;
};
