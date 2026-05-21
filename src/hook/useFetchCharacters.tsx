import { useCharacterStore } from "../stores/charactersStore";
import { ApiService } from "../services/api/ApiService";
import { LocalStorageService } from "../services/local/LocalStorageService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { ExtendedCharacter, CharacterResponse } from "../types/Character";

export const useFetchCharacters = () => {
  const { set, page, status, species, type, name, gender, source } =
    useCharacterStore();

  const query = useQuery({
    queryKey: ["characters", page, status, species, type, name, gender, source],
    queryFn: async () => {
      if (source === "local") {
        return LocalStorageService.getCreateCharacter();
      }
      return ApiService.getCharacters({ status, page, species, type, name, gender });
    },
  });

  const prevSource = useRef(source);

  useEffect(() => {
    if (!query.data) return;

    const { characters, loadedPages } = useCharacterStore.getState();

    if (source === "local") {
      prevSource.current = source;
      set({
        characters: (query.data as ExtendedCharacter[]).map((p) => ({ ...p, isCreate: true })),
        info: { next: null },
        loadedPages: [],
      });
      return;
    }

    prevSource.current = source;

    if (loadedPages.includes(page)) return;

    const response = query.data as CharacterResponse;
    set({
      characters: [...characters, ...response.results],
      info: response.info,
      loadedPages: [...loadedPages, page],
    });
  }, [query.data, query.isFetching, page, source, set]);

  return query;
};
