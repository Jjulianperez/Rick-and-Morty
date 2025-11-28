import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { type CardProps } from "../../types/Character";
import { useSingleCharacterStore } from "../../stores/characterSingleStore";
import ImgenDeRespaldo from '../../assets/cargando.png'
import { useDeleteCharacter } from "../../hook/useCreateCharacter";

export const Card = ({ 
  isFavorito, 
  isCreate, 
  ImgCharacter, 
  name, 
  status, 
  firstSeen, 
  lastSeen,
  id
}: CardProps) => {

  const [isFav, setIsFav] = useState(isFavorito);
  const { clearCharacters } = useSingleCharacterStore();

  // ⬅ Aca va el hook, UNA sola vez:
  const { mutate: deleteCharacter } = useDeleteCharacter();

  const className = `character-card ${isFav && "fav"} ${isCreate && "create"} ${isFav && isCreate && "createAndFav"} `;

  const handleFav = () => {
    setIsFav(!isFav)
  };

  return (
    <article className={className}>
      {
        ImgCharacter===null 
          ? <img src={ImgenDeRespaldo} alt={name}/>
          : <img src={ImgCharacter} alt={name}/>
      }

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
          <button onClick={() => clearCharacters()}>
            <Link to="/characters/$id" params={{ id: String(id) }}>
              Ver Personaje
            </Link>
          </button>

          {isCreate && (
            <button onClick={() => deleteCharacter(id)}>
              Eliminar Personaje
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};
