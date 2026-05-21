import { createFileRoute } from "@tanstack/react-router";
import { useFetchSingleCharacters } from "../hook/useFetchSingleCharacter";
import { CharacterDetail } from "../components/characterId/Character";
import { useSingleCharacterStore } from "../stores/characterSingleStore";
import { ModalCarga } from "../components/modalCarga/ModalCarga";

export const Route = createFileRoute("/characters/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  useFetchSingleCharacters(id);
  const { character, loading } = useSingleCharacterStore();

  if (loading) return <ModalCarga mensaje="Cargando personaje..." />;

  if (!character)
    return <p style={{ textAlign: "center" }}>No se encontró el personaje.</p>;

  return <CharacterDetail character={character} />;
}
