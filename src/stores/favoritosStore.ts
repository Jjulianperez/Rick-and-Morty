import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavCharacter {
  id: string;
  name: string;
  image?: string;
  status: string;
  firstSeen: string;
  lastSeen: string;
  isCreate: boolean;
}

interface FavoritosState {
  favoritos: FavCharacter[];
  toggleFav: (char: FavCharacter) => void;
  isFav: (id: string) => boolean;
  removeFav: (id: string) => void;
}

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favoritos: [],
      toggleFav: (char) => {
        const current = get().favoritos;
        if (current.some((f) => f.id === char.id)) {
          set({ favoritos: current.filter((f) => f.id !== char.id) });
        } else {
          set({ favoritos: [...current, char] });
        }
      },
      isFav: (id) => get().favoritos.some((f) => f.id === id),
      removeFav: (id) => {
        set({ favoritos: get().favoritos.filter((f) => f.id !== id) });
      },
    }),
    { name: "rickandmorty-favoritos" }
  )
);
