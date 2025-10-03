import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

type CardProps = {
  isFavorito: boolean;
  isCreate: boolean;
  ImgCharacter: string;
  name: string;
  status: string;
  firstSeen: string;
  lastSeen: string;
};

export const Card = ({ isFavorito, isCreate, ImgCharacter, name, status, firstSeen, lastSeen,}: CardProps) => {

  const [isFav, setIsFav] = useState(isFavorito);


// let className = "character-card";
  
// if (isFav && isCreate) className += " createAndFav";

// else if (isFav) className += " fav";

// else if (isCreate) className += " create";
const className = `character-card ${isFav && "fav"} ${isCreate && "create"} ${isFav && isCreate && "createAndFav"} `

  const handleFav = () => {
    console.log(`Este es el valor antes del click ${isFav}`)
    
    setIsFav(!isFav)

    console.log(`Este es el valor despues del click ${isFav}`)
  };

  return (
    <article className={className}>
      <img src={ImgCharacter} alt={name} />

      <span onClick={handleFav} className="fav-btn">

        {isFav ? <AiFillHeart /> : <AiOutlineHeart />}

      </span>

      <div className="infoPersonaje">
        <div>
          <p className="name">{name}</p>
          <span className={`status ${status}`}>{status}</span>
          <p className="text">Visto por primera vez en {firstSeen}</p>
          <p className="text">Visto por última vez en {lastSeen}</p>
        </div>
        <footer>
          <button><Link to="/characters/$id" params ={{id: String(1)  }}>Ver Personaje</Link></button>
        </footer>
      </div>
    </article>
  );
};
