import { Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { type ExtendedCharacter } from "../../types/Character";
import { useFetchEpisodes } from "../../hook/useFechEpisode";

interface CharacterDetailProps {
  character?: ExtendedCharacter;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  // estados
  const [activeTab, setActiveTab] = useState("detalles");
  const [isFav, setIsFav] = useState(character?.isFavorito);
  const [episodePage, setEpisodePage] = useState(0);
  const { episodes, isLoading } = useFetchEpisodes((character?.episode as unknown as string[]) || []);

  const EPISODES_PER_PAGE = 3;

  useEffect(() => {
    const clasePadre = document.getElementById("character");
    if (clasePadre) {
      clasePadre.className = character?.isCreate
        ? "body-character-create"
        : "body-character";
    }
  }, [character?.isCreate]);

  // Favorito
  const handleFav = () => {
    setIsFav(!isFav);
  };

  // Pagination
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

  return (
    <div className="character-detail-div">
      {character?.isCreate === true && (
        <div className="character-actions-top">
          <button className="btn-edit">
            <Link to="/edit$id" params={{ id: String(1) }}>
              Editar
            </Link>
          </button>
          <button className="btn-delete">Eliminar personaje</button>
        </div>
      )}

      <section className="character-header">
        <img src={character?.image} alt={character?.name} className="character-image" />

        <div className="character-info">
          <span onClick={handleFav} className="fav-btn">
            {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>

          <p>
            <span className="label">Nombre:</span>{" "}
            <strong>{character?.name}</strong>
          </p>

          <p>
            <span className="label">Especie:</span> {character?.species}
          </p>

          <p className={character?.status}>
            <span className="label">Estado:</span> {character?.status}
          </p>

          <p>
            <span className="label">Género:</span> {character?.gender}
          </p>

          <p>
            <span className="label">Origen:</span> {character?.origin.name}
          </p>

          <p>
            <span className="label">Ubicación actual:</span>{" "}
            {character?.location.name}
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
            Episodios
          </button>
        </nav>

        <div className="character-content">
          {activeTab === "detalles" && (
            <p>
              Este personaje <strong>{character?.gender}</strong> llamado{" "}
              <strong>{character?.name}</strong> pertenece a la especie{" "}
              <strong>{character?.species}</strong> y actualmente se encuentra{" "}
              <strong>{character?.status}</strong>
              <br />
              <br />
              Este personaje aparece en{" "}
              <strong>{character?.episode.length}</strong> episodios de la serie.
            </p>
          )}

          {activeTab === "ubicacion" && (
            <p>Este personaje estuvo en {character?.location.name}</p>
          )}

          {activeTab === "episodios" && (
            <div className="character-actions">
              <button
                className="btn-back"
                onClick={handlePrev}
                disabled={episodePage === 0}
              >
                <FaArrowCircleLeft />
              </button>

              <div className="episodes-list">
                {isLoading && <p>Cargando episodios...</p>}

                {!isLoading &&
                  currentEpisodes.map((ep) => (
                    <div key={ep.id} className="episode-card">
                      <strong>
                        <h4>{ep.name}</h4>
                      </strong>
                      <p>{ep.episode}</p>
                      <p>{ep.air_date}</p>
                    </div>
                  ))}
              </div>

              <button
                className="btn-next"
                onClick={handleNext}
                disabled={(episodePage + 1) * EPISODES_PER_PAGE >= episodes.length}
              >
                <FaArrowCircleRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
