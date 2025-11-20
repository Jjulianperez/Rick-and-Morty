import { useEpisodeStore } from "../stores/episodeStore";
import { ApiService } from "../services/api/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useFetchEpisodes = (episodeUrls: string[]) => {
  const { episodes, setEpisodes } = useEpisodeStore();
  const ids = episodeUrls.map((url) => url.split("/").pop()!);
  const missingIds = ids.filter((id) => !episodes[id]);

  const query = useQuery({
    queryKey: ["episodes", missingIds],
    queryFn: () => {
      if (missingIds.length === 0) return Promise.resolve([]);
      return ApiService.getEpisode(missingIds.map((id) => id));
    },
    enabled: missingIds.length > 0,
  });

  // cuando llegan los episodios
  if (query.data) {
    const list = Array.isArray(query.data) ? query.data : [query.data];
    setEpisodes(list);
  }

  // retornamos todo los ya caceados
  const finalEpisodes = ids
    .map((id) => episodes[id])
    .filter(Boolean);

  return { episodes: finalEpisodes, isLoading: query.isLoading };
};
