"use client";

import { create } from "zustand";
import type { Dispatch, SetStateAction } from "react";

type StateUpdater<T> = SetStateAction<T>;
type StoreSetter<T> = Dispatch<StateUpdater<T>>;

export type ChargeState = {
  chargeclick: boolean;
};

export type UserState = {
  username: string;
  university: string;
  major: string;
  age: string | number;
  admissionYear: number | string;
  song: string;
  mbti: string;
  gender: string;
  point: number;
  pickMe: number;
  contact_id: string;
  canRequestCharge: boolean;
  hobby: unknown[];
  comment: string;
  numParticipants: number;
  contactFrequency: string;
  contact_frequency: string;
  contact: string;
  [key: string]: unknown;
};

export type SelectedMbtiState = {
  EI: string;
  SN: string;
  TF: string;
  PJ: string;
};

export type MatchPickState = {
  selectedMBTI: string[];
  selectedCategory: unknown[];
  point: number;
  balance: number | null;
  isUseOption: boolean[];
  formData: {
    ageOption?: string;
    mbtiOption?: string;
    hobbyOption?: unknown[];
    contactFrequencyOption?: string;
    sameMajorOption?: boolean;
    match_code?: string;
    FormData?: unknown;
  };
};

export type MatchResultState = {
  age: number;
  comment: string;
  contactFrequency: string;
  currentPoint: number;
  gender: string;
  hobby: string[];
  major: string;
  mbti: string;
  socialId: string;
  song: string;
  [key: string]: unknown;
};

type AppStore = {
  charge: ChargeState;
  adminRequests: unknown[];
  user: UserState;
  selectedMBTI: SelectedMbtiState;
  matchPick: MatchPickState;
  matchResult: MatchResultState;
  checkresult: unknown[];
  setCharge: StoreSetter<ChargeState>;
  setAdminRequests: StoreSetter<unknown[]>;
  setUser: StoreSetter<UserState>;
  setSelectedMBTI: StoreSetter<SelectedMbtiState>;
  setMatchPick: StoreSetter<MatchPickState>;
  setMatchResult: StoreSetter<MatchResultState>;
  setCheckresult: StoreSetter<unknown[]>;
  resetMatchPick: () => void;
  resetMatchResult: () => void;
};

const resolveState = <T>(next: StateUpdater<T>, previous: T): T =>
  typeof next === "function" ? ((next as CallableFunction)(previous) as T) : next;

const createChargeState = (): ChargeState => ({
  chargeclick: false,
});

const createUserState = (): UserState => ({
  username: "",
  university: "",
  major: "",
  age: "",
  admissionYear: "",
  song: "",
  mbti: "",
  gender: "",
  point: 0,
  pickMe: 0,
  contact_id: "",
  canRequestCharge: true,
  hobby: [],
  comment: "",
  numParticipants: 0,
  contactFrequency: "",
  contact_frequency: "",
  contact: "kakao",
});

const createSelectedMbtiState = (): SelectedMbtiState => ({
  EI: "",
  SN: "",
  TF: "",
  PJ: "",
});

const createMatchPickState = (): MatchPickState => ({
  selectedMBTI: ["X", "X", "X", "X"],
  selectedCategory: [],
  point: 500,
  balance: null,
  isUseOption: [false, false, false, false],
  formData: {
    ageOption: "",
    mbtiOption: "",
    hobbyOption: [],
    contactFrequencyOption: "",
    sameMajorOption: false,
  },
});

const createMatchResultState = (): MatchResultState => ({
  age: 0,
  comment: "",
  contactFrequency: "",
  currentPoint: 0,
  gender: "",
  hobby: [],
  major: "",
  mbti: "",
  socialId: "",
  song: "",
});

export const useAppStore = create<AppStore>((set) => ({
  charge: createChargeState(),
  adminRequests: [],
  user: createUserState(),
  selectedMBTI: createSelectedMbtiState(),
  matchPick: createMatchPickState(),
  matchResult: createMatchResultState(),
  checkresult: [],
  setCharge: (next) =>
    set((state) => ({ charge: resolveState(next, state.charge) })),
  setAdminRequests: (next) =>
    set((state) => ({
      adminRequests: resolveState(next, state.adminRequests),
    })),
  setUser: (next) =>
    set((state) => ({ user: resolveState(next, state.user) })),
  setSelectedMBTI: (next) =>
    set((state) => ({
      selectedMBTI: resolveState(next, state.selectedMBTI),
    })),
  setMatchPick: (next) =>
    set((state) => ({
      matchPick: resolveState(next, state.matchPick),
    })),
  setMatchResult: (next) =>
    set((state) => ({
      matchResult: resolveState(next, state.matchResult),
    })),
  setCheckresult: (next) =>
    set((state) => ({
      checkresult: resolveState(next, state.checkresult),
    })),
  resetMatchPick: () => set({ matchPick: createMatchPickState() }),
  resetMatchResult: () => set({ matchResult: createMatchResultState() }),
}));

export function useChargeState() {
  return [
    useAppStore((state) => state.charge),
    useAppStore((state) => state.setCharge),
  ] as const;
}

export function useAdminRequestsState() {
  return [
    useAppStore((state) => state.adminRequests),
    useAppStore((state) => state.setAdminRequests),
  ] as const;
}

export function useUserState() {
  return [
    useAppStore((state) => state.user),
    useAppStore((state) => state.setUser),
  ] as const;
}

export function useSelectedMbtiState() {
  return [
    useAppStore((state) => state.selectedMBTI),
    useAppStore((state) => state.setSelectedMBTI),
  ] as const;
}

export function useMatchPickState() {
  return [
    useAppStore((state) => state.matchPick),
    useAppStore((state) => state.setMatchPick),
  ] as const;
}

export function useMatchResultState() {
  return [
    useAppStore((state) => state.matchResult),
    useAppStore((state) => state.setMatchResult),
  ] as const;
}

export function useCheckResultState() {
  return [
    useAppStore((state) => state.checkresult),
    useAppStore((state) => state.setCheckresult),
  ] as const;
}

export function useUserValue() {
  return useAppStore((state) => state.user);
}

export function useResetMatchPickState() {
  return useAppStore((state) => state.resetMatchPick);
}

export function useResetMatchResultState() {
  return useAppStore((state) => state.resetMatchResult);
}
