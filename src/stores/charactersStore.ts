import { create } from "zustand";
import type { ExtendedCharacter, Info } from "../types/Character";

interface CharacterState {
  characters: ExtendedCharacter[];
  info: Info;
  page: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  source: "api" | "local";
  loadedPages: number[];
  set: (state: Partial<CharacterState>) => void;
  incrementPage: () => void;
  clearCharacters: () => void;
}

const initialState: Omit<CharacterState, "set" | "incrementPage" | "clearCharacters"> = {
  characters: [],
  info: {},
  page: 1,
  species: undefined,
  name: undefined,
  status: undefined,
  type: undefined,
  gender: undefined,
  source: 'api',
  loadedPages: [],
};

export const useCharacterStore = create<CharacterState>((set, get) => ({
  ...initialState,

  set: (newState) => set(newState),

  incrementPage: () => {
    const current = get().page;
    set({ page: current + 1 });
  },

  clearCharacters: () => {
    set({
      characters: [],
      page: 1,
      loadedPages: [],
    });
  },
}));
