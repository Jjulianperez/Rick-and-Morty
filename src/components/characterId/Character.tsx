import { Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { type ExtendedCharacter } from '../../types/Character'

interface CharacterDetailProps {
  character?: ExtendedCharacter
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({character}) => {

  const [activeTab, setActiveTab] = useState("detalles");
  const [isFav, setIsFav] = useState(character?.isFavorito);


  useEffect(() => {
    const clasePadre = document.getElementById("character");
    
    if(clasePadre){
      
    if (!character?.isCreate) clasePadre.className = "body-character"
    else clasePadre.className= 'body-character-create'
}
}, [character?.isCreate]);


  const handleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <div className="character-detail-div">

      {character?.isCreate === true ? (
        <div className="character-actions-top">
        <button className="btn-edit"><Link to="/edit$id" params ={{id: String(1)  }}>Editar</Link></button>
        <button className="btn-delete">Eliminar personaje</button>
      </div>
      ) : ''}

      <section className="character-header">
        <img src={character?.image} alt={character?.name} className="character-image" />

        <div className="character-info">
          <span onClick={handleFav} className="fav-btn">
            {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>

          <p><span className="label">Nombre:</span> <strong>{character?.name}</strong></p>
          <p><span className="label">Especie:</span> {character?.species}</p>
          <p className={status.toLowerCase() === "muerto" ? "dead" : ""}>
            <span className="label">Estado:</span> {character?.status}
          </p>
          <p><span className="label">Género:</span> {character?.gender}</p>
          <p><span className="label">Origen:</span> {character?.origin.name}</p>
          <p><span className="label">Ubicación actual:</span> {character?.location.name}</p>
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
              Este Personaje <strong>{character?.gender}</strong> llamado{" "}
              <strong>{character?.name}</strong> pertenece a la especie{" "}
              <strong>{character?.species}</strong> y actualmente se encuentra{" "}
              <strong>{character?.status}</strong> <br />
              <br />
              Este Personaje aparece en{" "}
              <strong>{character?.episode.length}</strong> episodios de la serie
            </p>
          )}
          {activeTab === "ubicacion" && (
            <p>Este personaje estuvo en {character?.location.name}</p>
          )}
          {activeTab === "episodios" && (
            <div className="character-actions">
              <button className="btn-back">
                <FaArrowCircleLeft />
              </button>
              <div className="episodes-list">
                {character?.episode.map((ep) => (
                  <div key={ep.id} className="episode-card">
                    <strong><h4>{ep.name}</h4></strong>
                    <br />
                    <p>{ep.episode}</p>
                    <p>{ep.air_date}</p>
                  </div>
                ))}
              </div>
              <button className="btn-next">
                <FaArrowCircleRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
