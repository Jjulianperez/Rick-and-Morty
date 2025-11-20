import { useCharacterStore } from "../stores/charactersStore";
import { ApiService } from "../services/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchCharacters = () => {
  const { set, page, characters, status, species, type, name, gender } = useCharacterStore();
  const query = useQuery({
      queryKey: ["characters", page, status, species, type, name, gender],
      queryFn: () => ApiService.getCharacters({ status, page, species, type, name, gender }),
    });
    
    
    useEffect(() => {
        if (query.data) {
            set({
                characters: characters.concat(query.data.results),
                info: query.data.info,
            });
            console.log(page)
    }
  }, [query.data, set]);

  return query;
};
