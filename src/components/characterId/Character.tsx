import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { type ExtendedCharacter, type Episode } from "../../types/Character";
import { useFetchEpisodes } from "../../hook/useFechEpisode";
import { useDeleteCharacter } from "../../hook/useCreateCharacter";
import { useNavigate } from "@tanstack/react-router";
import { useToastStore } from "../../stores/toastStore";

interface CharacterDetailProps {
  character?: ExtendedCharacter;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  const [activeTab, setActiveTab] = useState("detalles");
  const [isFav, setIsFav] = useState(character?.isFavorito);
  const [episodePage, setEpisodePage] = useState(0);
  const episodeUrls = (character?.episode as string[] | undefined) ?? [];
  const { episodes, isLoading } = useFetchEpisodes(episodeUrls);
  const { mutate: deleteCharacter } = useDeleteCharacter();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const EPISODES_PER_PAGE = 3;
  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);

  useEffect(() => {
    const clasePadre = document.getElementById("character");
    if (clasePadre) {
      clasePadre.className = character?.isCreate
        ? "body-character-create"
        : "body-character";
    }
  }, [character?.isCreate]);

  const handleFav = () => {
    setIsFav(!isFav);
  };

  const handleNext = () => {
    if ((episodePage + 1) * EPISODES_PER_PAGE < episodes.length) {
      setEpisodePage(episodePage + 1);
    }
  };

  const handlePrev = () => {
    if (episodePage > 0) setEpisodePage(episodePage - 1);
  };

  const currentEpisodes = episodes.slice(
    episodePage * EPISODES_PER_PAGE,
    episodePage * EPISODES_PER_PAGE + EPISODES_PER_PAGE
  );

  if (!character) {
    return <p style={{ textAlign: "center" }}>No se encontró el personaje.</p>;
  }

  return (
    <div className="character-detail-div">
      {character.isCreate && (
        <div className="character-actions-top">
          <Link to="/edit/$id" params={{ id: String(character.id) }}>
            <button className="btn-edit">Editar</button>
          </Link>
          <button className="btn-delete" onClick={() => {
            if (window.confirm(`¿Eliminar a "${character.name}"?`)) {
              deleteCharacter(String(character.id), {
                onSuccess: () => {
                  addToast("Personaje eliminado", "success");
                  navigate({ to: "/" });
                },
                onError: () => addToast("Error al eliminar", "error"),
              });
            }
          }}>
            Eliminar personaje
          </button>
        </div>
      )}

      <section className="character-header">
        <img src={character.image} alt={character.name} className="character-image" />

        <div className="character-info">
          <span onClick={handleFav} className="fav-btn">
            {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>

          <p>
            <span className="label">Nombre:</span>{" "}
            <strong>{character.name}</strong>
          </p>

          <p>
            <span className="label">Especie:</span> {character.species}
          </p>

          <p className={character.status}>
            <span className="label">Estado:</span> {character.status}
          </p>

          <p>
            <span className="label">Género:</span> {character.gender}
          </p>

          <p>
            <span className="label">Origen:</span> {character.origin?.name}
          </p>

          <p>
            <span className="label">Ubicación actual:</span>{" "}
            {character.location?.name}
          </p>
        </div>
      </section>

      <section className="character-details">
        <nav className="character-tabs">
          <button
            className={activeTab === "detalles" ? "active" : ""}
            onClick={() => setActiveTab("detalles")}
          >
            Detalles
          </button>

          <button
            className={activeTab === "ubicacion" ? "active" : ""}
            onClick={() => setActiveTab("ubicacion")}
          >
            Ubicación
          </button>

          <button
            className={activeTab === "episodios" ? "active" : ""}
            onClick={() => setActiveTab("episodios")}
          >
            Episodios {episodes.length > 0 && `(${episodes.length})`}
          </button>
        </nav>

        <div className="character-content">
          {activeTab === "detalles" && (
            <p>
              Este personaje <strong>{character.gender}</strong> llamado{" "}
              <strong>{character.name}</strong> pertenece a la especie{" "}
              <strong>{character.species}</strong> y actualmente se encuentra{" "}
              <strong>{character.status}</strong>
              <br />
              <br />
              Este personaje aparece en{" "}
              <strong>{character.episode?.length ?? 0}</strong> episodios de la serie.
            </p>
          )}

          {activeTab === "ubicacion" && (
            <p>Este personaje estuvo en {character.location?.name}</p>
          )}

          {activeTab === "episodios" && (
            <div className="episodes-section">
              {isLoading && (
                <div className="episodes-loading">
                  <div className="episode-card skeleton" />
                  <div className="episode-card skeleton" />
                  <div className="episode-card skeleton" />
                </div>
              )}

              {!isLoading && episodes.length === 0 && (
                <p className="episodes-empty">No hay episodios disponibles</p>
              )}

              {!isLoading && episodes.length > 0 && (
                <>
                  <div className="episodes-carousel">
                    <button
                      className="episode-nav-btn"
                      onClick={handlePrev}
                      disabled={episodePage === 0}
                      aria-label="Anterior"
                    >
                      <FaArrowLeft />
                    </button>

                    <div className="episodes-list">
                      {currentEpisodes.map((ep: Episode) => (
                        <div key={ep.id} className="episode-card">
                          <span className="episode-badge">{ep.episode}</span>
                          <h4>{ep.name}</h4>
                          <p className="episode-date">{ep.air_date}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      className="episode-nav-btn"
                      onClick={handleNext}
                      disabled={episodePage >= totalPages - 1}
                      aria-label="Siguiente"
                    >
                      <FaArrowRight />
                    </button>
                  </div>

                  <div className="episodes-pagination">
                    {episodePage + 1} / {totalPages}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
