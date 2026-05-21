import { ApiService } from "../services/api/ApiService";
import { LocalStorageService } from "../services/local/LocalStorageService";
import { useSingleCharacterStore } from "../stores/characterSingleStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { ExtendedCharacter } from "../types/Character";

export const useFetchSingleCharacters = (id: string) => {
  const { set, setLoading } = useSingleCharacterStore();

  const isNumericId = /^\d+$/.test(id);

  const query = useQuery({
    queryKey: ["character", id],
    queryFn: async (): Promise<ExtendedCharacter | null> => {
      if (isNumericId) {
        return ApiService.getSingleCharacter(id);
      }

      const localChars = await LocalStorageService.getCreateCharacter();
      const found = localChars.find((c) => String(c.id) === id);
      if (found) {
        return { ...found, isCreate: true };
      }
      return null;
    },
    enabled: !!id,
  });

  useEffect(() => {
    setLoading(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoading]);

  useEffect(() => {
    if (query.data) {
      set({ character: query.data as ExtendedCharacter });
    }
  }, [query.data, set]);

  return query;
};
