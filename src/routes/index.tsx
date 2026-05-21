import { createFileRoute } from "@tanstack/react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "../components/card/Card";
import { useFetchCharacters } from "../hook/useFetchCharacters";
import { useCharacterStore } from "../stores/charactersStore";
import { Filtro } from "../components/filtro/Filtro";
import type { ExtendedCharacter } from "../types/Character";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error } = useFetchCharacters();
  const { characters, incrementPage, info, source } = useCharacterStore();

  return (
    <main>
      <Filtro />

      <InfiniteScroll
        dataLength={characters.length}
        next={incrementPage}
        loader={
          error
            ? <p style={{ textAlign: "center", color: "#ff6b6b", padding: "1rem" }}>Error al cargar más personajes</p>
            : <h4 style={{ textAlign: "center" }}>Cargando más personajes...</h4>
        }
        hasMore={source === "api" ? !!info.next && !error : false}
        endMessage={<p style={{ textAlign: "center" }}>¡Has visto todos!</p>}
        style={{ overflow: "visible" }}
      > 
        <div className="cards-grid">
          {characters.length === 0 && !error ? (
            <p>No se encontraron personajes.</p>
          ) : (
            characters.map((character: ExtendedCharacter) => (
              <Card
                key={character.id}
                id={String(character.id)}
                name={character.name ?? ""}
                ImgCharacter={character.image}
                status={character.status ?? "unknown"}
                lastSeen={character.lastSeen ?? ""}
                firstSeen={character.firstSeen ?? ""}
                isCreate={character.isCreate ?? false}
                isFavorito={character.isFavorito ?? false}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </main>
  );
}
