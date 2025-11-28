import { useCharacterStore } from "../stores/charactersStore";
import { ApiService } from "../services/api/ApiService";
import { ServerService } from "../services/server/ServerService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchCharacters = () => {
  const { set, page, characters, status, species, type, name, gender, source } =
    useCharacterStore();

  const query = useQuery({
    queryKey: ["characters", page, status, species, type, name, gender, source],
    queryFn: () => {
      if (source === "local") {
        return ServerService.getCreateCharacter();
      }

      return ApiService.getCharacters({
        status,
        page,
        species,
        type,
        name,
        gender,
      });
    },
  });

  useEffect(() => {
    if (!query.data) return;

    if (source === "local") {
      const personajesLocal = query.data.map((p) => ({
        ...p,
        isCreate: true,
      }));

      set({
        characters: personajesLocal,
        info: { next: null },
      });
      return;
    }

    set({
      characters: characters.concat(query.data.results),
      info: query.data.info,
    });
  }, [query.data]);

  return query;
};
