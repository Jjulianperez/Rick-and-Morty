import { axiosInstance } from "./axiosInstance";
import type { ExtendedCharacter, Info, CharactersParams } from "../../types/Character";

interface CharactersResponse {
  info: Info;
  results: ExtendedCharacter[];
}

const getCharacters = async (params: CharactersParams = {}): Promise<CharactersResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([v]) =>
      v !== undefined && v !== "" && v !== "default"
    )
  );

  return axiosInstance.get(`/character`, { params: cleanParams });
};

const getSingleCharacter = async (id: string) => {
  return axiosInstance.get(`/character/${id}`);
};

const getEpisode = async (episodeIds: string[]) => {
  if (!episodeIds.length) return [];
  const ids = episodeIds.join(",");
  return axiosInstance.get(`/episode/${ids}`);
};

export const ApiService = {
  getCharacters,
  getSingleCharacter,
  getEpisode,
};
