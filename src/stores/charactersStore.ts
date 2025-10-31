import { create } from "zustand";
import type { ExtendedCharacter, Info } from "../types/Character";

interface CharacterState {
  characters: ExtendedCharacter[];
  info: Info;
  page: number;
  incrementPage: ()=> void
  set: (state:Partial<CharacterState>) => void;
}

const initialState: Omit<CharacterState, "set"> = {
  characters: [],
  info: {}, 
  page: 1,
  incrementPage: ()=>{}
};

export const useCharacterStore = create<CharacterState>((set, get) => ({
  ...initialState,
  set: (newState)=> set(newState),
  incrementPage:()=>{
    console.log('increment page')
    const current = get().page
    set({
      page: current +1
    })
  }
  }));
