import { createFileRoute } from "@tanstack/react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "../components/card/Card";
import { useFetchCharacters } from "../hook/useFetchCharacters";
import { useCharacterStore } from "../stores/charactersStore";
import { Filtro } from "../components/filtro/Filtro";
import "../scss/main.scss";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error } = useFetchCharacters();
  const { characters, incrementPage, info, source } = useCharacterStore();

  if (error) {
    return <p>Error al cargar los personajes</p>;
  }

  return (
    <main>
      <Filtro />

      <InfiniteScroll
        dataLength={characters.length}
        next={incrementPage}
        loader={<h4 style={{ textAlign: "center" }}>Cargando más personajes...</h4>}
        hasMore={source === "api" ? !!info.next : false}
        endMessage={<p style={{ textAlign: "center" }}>¡Has visto todos!</p>}
        style={{ overflow: "visible" }}
      > 
        <div className="cards-grid">
          {characters.length === 0 ? (
            <p>No se encontraron personajes.</p>
          ) : (
            characters.map((character) => (
              <Card
                key={character.id}
                id={character.id}
                name={character.name}
                ImgCharacter={character.image}
                status={character.status}
                lastSeen={character.lastSeen ?? "Desconocido"}
                firstSeen={character.firstSeen ?? "Desconocido"}
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
