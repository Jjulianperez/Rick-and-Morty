import { Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface Episode {
  id: number;
  name: string;
  code: string;
  airDate: string;
}

interface CharacterDetallesProps {
  image: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: string;
  location: string;
  isFavorito: boolean;
  isCreate: boolean;
  episodes: Episode[];
}

export const CharacterDetail: React.FC<CharacterDetallesProps> = ({
  image,
  name,
  species,
  status,
  gender,
  origin,
  location,
  episodes,
  isFavorito,
  isCreate
}) => {
  const [activeTab, setActiveTab] = useState("detalles");
  const [isFav, setIsFav] = useState(isFavorito);


  useEffect(() => {
    const clasePadre = document.getElementById("character");
    
    if(clasePadre){
      
    if (!isCreate) clasePadre.className = "body-character"
    else clasePadre.className= 'body-character-create'
}
}, [isCreate]);


  const handleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <div className="character-detail-div">

      {isCreate === true ? (
        <div className="character-actions-top">
        <button className="btn-edit"><Link to="/edit$id" params ={{id: String(1)  }}>Editar</Link></button>
        <button className="btn-delete">Eliminar personaje</button>
      </div>
      ) : ''}

      <section className="character-header">
        <img src={image} alt={name} className="character-image" />

        <div className="character-info">
          <span onClick={handleFav} className="fav-btn">
            {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>

          <p><span className="label">Nombre:</span> <strong>{name}</strong></p>
          <p><span className="label">Especie:</span> {species}</p>
          <p className={status.toLowerCase() === "muerto" ? "dead" : ""}>
            <span className="label">Estado:</span> {status}
          </p>
          <p><span className="label">Género:</span> {gender}</p>
          <p><span className="label">Origen:</span> {origin}</p>
          <p><span className="label">Ubicación actual:</span> {location}</p>
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
              Este Personaje <strong>{gender}</strong> llamado{" "}
              <strong>{name}</strong> pertenece a la especie{" "}
              <strong>{species}</strong> y actualmente se encuentra{" "}
              <strong>{status}</strong> <br />
              <br />
              Este Personaje aparece en{" "}
              <strong>{episodes.length}</strong> episodios de la serie
            </p>
          )}
          {activeTab === "ubicacion" && (
            <p>Este personaje estuvo en {location}</p>
          )}
          {activeTab === "episodios" && (
            <div className="character-actions">
              <button className="btn-back">
                <FaArrowCircleLeft />
              </button>
              <div className="episodes-list">
                {episodes.map((ep) => (
                  <div key={ep.id} className="episode-card">
                    <strong><h4>{ep.name}</h4></strong>
                    <br />
                    <p>{ep.code}</p>
                    <p>{ep.airDate}</p>
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
