import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';


interface Episode {
  id: number;
  name: string;
  code: string;
  airDate: string;
}

interface CharacterDetailProps {
  image: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: string;
  location: string;
  episodes: Episode[];
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({ image, name, species, status, gender, origin, location, episodes}) => {
  const [activeTab, setActiveTab] = useState("detalles");

  return (
    <div className="character-detail-div">
      <section className="character-header">
        <img src={image} alt={name} className="character-image" />

        <div className="character-info">
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
        <p>Este Personaje <strong>{gender}</strong> llamado <strong>{name}</strong> pertenece a la especie <strong>{species}</strong> y actualmente se encuentra <strong>{status}</strong> <br /><br />Este Personaje parece en <strong>{episodes.length}</strong> episodios de la serie</p>
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
              <strong><h4>{ep.name}</h4></strong><br />
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
