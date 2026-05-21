import { create } from "zustand";
import type { ExtendedCharacter } from "../types/Character";

interface SingleCharacterState {
  character?: ExtendedCharacter;
  loading: boolean;
  set: (state: Partial<SingleCharacterState>) => void;
  setLoading: (value: boolean) => void;
}

export const useSingleCharacterStore = create<SingleCharacterState>((set) => ({
  character: undefined,
  loading: false,
  set: (newState) => set(newState),
  setLoading: (value) => set({ loading: value }),
}));
