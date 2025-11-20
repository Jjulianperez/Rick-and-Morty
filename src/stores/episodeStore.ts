import { create } from "zustand";
import type { Episode } from "../types/Character";

interface EpisodeState {
  episodes: Record<string, Episode>;
  setEpisodes: (eps: Episode[]) => void;
}

export const useEpisodeStore = create<EpisodeState>((set) => ({
  episodes: {},

  setEpisodes: (eps) =>
    set((state) => {
      const map: Record<string, Episode> = { ...state.episodes };
      eps.forEach((ep) => {
        map[String(ep.id)] = ep;
      });
      return { episodes: map };
    }),
}));
