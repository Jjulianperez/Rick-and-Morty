import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import ImgenDeRespaldo from '../../assets/cargando.png'
import { useDeleteCharacter } from "../../hook/useCreateCharacter";
import { useFavoritosStore } from "../../stores/favoritosStore";
import { useToastStore } from "../../stores/toastStore";
import { ConfirmDialog } from "../confirmDialog/ConfirmDialog";
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
  const [showConfirm, setShowConfirm] = useState(false);

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
    deleteCharacter(id, {
      onSuccess: () => {
        addToast("Personaje eliminado", "success");
        setShowConfirm(false);
      },
      onError: () => addToast("Error al eliminar", "error"),
    });
  };

  return (
    <article className={className}>
      <div className="character-image-wrapper">
        <img src={ImgCharacter ?? ImgenDeRespaldo} alt={name} />
      </div>

      <span onClick={handleFav} className="fav-btn">
        {esFavorito ? <AiFillHeart /> : <AiOutlineHeart />}
      </span>

      <div className="infoPersonaje">
        <div>
          <p className="name">{name}</p>
          <span className={`status ${status}`}>{status}</span>
          {firstSeen && <p className="text">Visto por primera vez en {firstSeen}</p>}
          {lastSeen && <p className="text">Visto por última vez en {lastSeen}</p>}
        </div>
        <footer>
          <Link to={isCreate ? "/user-character/$id" : "/characters/$id"} params={{ id: String(id) }}>
            <button>Ver Personaje</button>
          </Link>

          {isCreate && (
            <button onClick={() => setShowConfirm(true)}>
              Eliminar Personaje
            </button>
          )}
        </footer>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="Eliminar personaje"
        message={`¿Estás seguro de eliminar a "${name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        variant="danger"
      />
    </article>
  );
};
