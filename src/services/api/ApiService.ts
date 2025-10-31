import { axiosInstance } from "./axiosInstance";
import type { ExtendedCharacter,Info } from "../../types/Character";

interface CharactersResponse {
  info: Info;
  results: ExtendedCharacter[];
}


const getCharacters = (page = 1): Promise<CharactersResponse> => {
  return axiosInstance.get(`/character?page=${page}`);
};

const getCharactersStatusLive = () => {
  return axiosInstance.get("/character?status=alive");
};

export const ApiService = {
  getCharacters,
  getCharactersStatusLive,
};
