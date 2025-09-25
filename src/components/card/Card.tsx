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


let className = "character-card";
  
if (isFav && isCreate) className += " createAndFav";

else if (isFav) className += " fav";

else if (isCreate) className += " create";

  const handleFav = () => {
    console.log(`Este es el valor antes del click ${isFav}`)
    
    setIsFav(!isFav)

    console.log(`Este es el valor despues del click ${isFav}`)
  };

  return (
    <article className={className}>
      <img src={ImgCharacter} alt={name} />
      <div className="infoPersonaje">
        <div>
          <p className="name">{name}</p>
          <span className={`status ${status}`}>{status}</span>
          <p className="text">Visto por primera vez en {firstSeen}</p>
          <p className="text">Visto por última vez en {lastSeen}</p>
        </div>
        <footer>
          <button>Ver Personaje</button>
          <AiOutlineHeart onClick={handleFav}>Agregar favoritos</AiOutlineHeart>
        </footer>
      </div>
    </article>
  );
};
