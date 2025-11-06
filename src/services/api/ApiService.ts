import { axiosInstance } from "./axiosInstance";
import type { ExtendedCharacter,Info, CharactersParams } from "../../types/Character";

interface CharactersResponse {
  info: Info;
  results: ExtendedCharacter[];
}

const getCharacters = async (params: CharactersParams = {}): Promise<CharactersResponse> => {

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([v]) => v !== undefined && v !== "" && v !== "default")
  );
  return await axiosInstance.get(`/character`, { params: cleanParams });
};


export const ApiService = {
  getCharacters
};
