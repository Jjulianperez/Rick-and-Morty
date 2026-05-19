import { Link } from "@tanstack/react-router";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import ImgenDeRespaldo from '../../assets/cargando.png'
import { useDeleteCharacter } from "../../hook/useCreateCharacter";
import { useFavoritosStore } from "../../stores/favoritosStore";
import { useToastStore } from "../../stores/toastStore";
import type { CardProps } from "../../types/Character";

export const Card = ({
  isCreate,
  ImgCharacter,
  name,
  status,
  firstSeen,
  lastSeen,
  id
}: CardProps) => {

  const { isFav, toggleFav } = useFavoritosStore();
  const esFavorito = isFav(id);
  const { mutate: deleteCharacter } = useDeleteCharacter();
  const { addToast } = useToastStore();

  const className = `character-card ${esFavorito && "fav"} ${isCreate && "create"} ${esFavorito && isCreate && "createAndFav"} `;

  const handleFav = () => {
    toggleFav({
      id,
      name,
      image: ImgCharacter,
      status,
      firstSeen,
      lastSeen,
      isCreate,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar a "${name}"?`)) {
      deleteCharacter(id, {
        onSuccess: () => addToast("Personaje eliminado", "success"),
        onError: () => addToast("Error al eliminar", "error"),
      });
    }
  };

  return (
    <article className={className}>
      <img src={ImgCharacter ?? ImgenDeRespaldo} alt={name} />

      <span onClick={handleFav} className="fav-btn">
        {esFavorito ? <AiFillHeart /> : <AiOutlineHeart />}
      </span>

      <div className="infoPersonaje">
        <div>
          <p className="name">{name}</p>
          <span className={`status ${status}`}>{status}</span>
          <p className="text">Visto por primera vez en {firstSeen}</p>
          <p className="text">Visto por última vez en {lastSeen}</p>
        </div>
        <footer>
          <Link to="/characters/$id" params={{ id: String(id) }}>
            <button>Ver Personaje</button>
          </Link>

          {isCreate && (
            <button onClick={handleDelete}>
              Eliminar Personaje
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};
