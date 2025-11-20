import { ApiService } from "../services/api/ApiService";
import { useSingleCharacterStore } from "../stores/characterSingleStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchSingleCharacters = (id: string) => {
  const { set, setLoading } = useSingleCharacterStore();

  const query = useQuery({
    queryKey: ["character", id],
    queryFn: () => ApiService.getSingleCharacter(id),
    enabled: !!id, 
  });

  useEffect(() => {
    setLoading(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoading]);


  useEffect(() => {
    if (query.data) {
      set({
        character: query.data,
      });
    }
  }, [query.data, set]);

  return query;
};

//PENDIENTE 
//queda ver porque se hace el doble duplicado de los personajes
//Problema:

// el problema lo que hace es que al navegar a un prosonaje por su $id
// y se vuelve al la pestaña pricipal se hace un doble redenderizado de la pagina 1