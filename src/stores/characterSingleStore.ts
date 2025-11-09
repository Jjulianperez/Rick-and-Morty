import { create } from "zustand";
import type { ExtendedCharacter } from "../types/Character";

interface SingleCharacterState {
    character: ExtendedCharacter | undefined
    set: (state:Partial<SingleCharacterState>) => void;
}

export const useSingleCharacterStore = create<SingleCharacterState> ((set) =>({
    character: undefined,
    set: (newState)=> set(newState),
}))