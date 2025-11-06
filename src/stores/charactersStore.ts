import { create } from "zustand";
import type { ExtendedCharacter, Info } from "../types/Character";

interface CharacterState {
  characters: ExtendedCharacter[];
  info: Info;
  page: number;
  incrementPage: ()=> void
  clearCharacters: ()=> void
  set: (state:Partial<CharacterState>) => void;
  name: string | undefined,
  status: string | undefined,
  species: string | undefined,
  episode: string | undefined,
  type: string | undefined,
  gender: string | undefined
}


const initialState: Omit<CharacterState, "set"> = {
  characters: [],
  info: {}, 
  page: 1,
  species: undefined,
  name: undefined,
  status: undefined,
  episode: undefined,
  type: undefined,
  gender: undefined,
  incrementPage: ()=>{},
  clearCharacters: ()=>{}
};

export const useCharacterStore = create<CharacterState>((set, get) => ({
  ...initialState,
  set: (newState)=> set(newState),
  incrementPage:()=>{
    const current = get().page
    set({
      page: current +1
    })
  },
  clearCharacters:()=>{
    set({
      characters: [],
      page: 1
    })
  }
  }));
