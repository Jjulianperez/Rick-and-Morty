import { create } from "zustand";
import type { ExtendedCharacter, Info } from "../types/Character";

interface CommunityCharacterState {
  characters: ExtendedCharacter[];
  info: Info;
  page: number;
  name?: string;
  status?: string;
  species?: string;
  episode?: string;
  type?: string;
  gender?: string;
  set: (state: Partial<CommunityCharacterState>) => void;
  incrementPage: () => void;
  clearCharacters: () => void;
}

const initialCommunityState: Omit<CommunityCharacterState, "set" | "incrementPage" | "clearCharacters"> = {
  characters: [],
  info: {},
  page: 1,
  species: undefined,
  name: undefined,
  status: undefined,
  episode: undefined,
  type: undefined,
  gender: undefined
};

export const useCommunityCharacterStore = create<CommunityCharacterState>((set, get) => ({
  ...initialCommunityState,

  set: (newState) => set(newState),

  incrementPage: () => {
    const current = get().page;
    set({ page: current + 1 });
  },

  clearCharacters: () => {
    set({
      characters: [],
      page: 1,
    });
  },
}));
