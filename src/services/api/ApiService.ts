import { axiosInstance } from "./axiosInstance";
import type { ExtendedCharacter, Info, CharactersParams, Episode } from "../../types/Character";

interface CharactersResponse {
  info: Info;
  results: ExtendedCharacter[];
}

const getCharacters = async (params: CharactersParams = {}): Promise<CharactersResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) =>
      v !== undefined && v !== "" && v !== "default"
    )
  );

  return axiosInstance.get(`/character`, { params: cleanParams }) as Promise<CharactersResponse>;
};

const getSingleCharacter = async (id: string): Promise<ExtendedCharacter> => {
  return axiosInstance.get(`/character/${id}`) as Promise<ExtendedCharacter>;
};

const getEpisode = async (episodeIds: string[]): Promise<Episode | Episode[]> => {
  if (!episodeIds.length) return [];
  const ids = episodeIds.join(",");
  return axiosInstance.get(`/episode/${ids}`) as Promise<Episode | Episode[]>;
};

export const ApiService = {
  getCharacters,
  getSingleCharacter,
  getEpisode,
};
