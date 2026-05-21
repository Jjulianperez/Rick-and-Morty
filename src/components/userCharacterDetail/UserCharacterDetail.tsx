import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { LocalStorageService } from "../../services/local/LocalStorageService";
import { useFavoritosStore } from "../../stores/favoritosStore";
import { useToastStore } from "../../stores/toastStore";
import { ConfirmDialog } from "../confirmDialog/ConfirmDialog";
import type { ExtendedCharacter } from "../../types/Character";

interface UserCharacterDetailProps {
  character: ExtendedCharacter;
}

export const UserCharacterDetail: React.FC<UserCharacterDetailProps> = ({ character }) => {
  const [activeTab, setActiveTab] = useState("detalles");
  const [showConfirm, setShowConfirm] = useState(false);
  const { isFav, toggleFav } = useFavoritosStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const charId = String(character.id);
  const charName = character.name ?? "Personaje";
  const charStatus = character.status ?? "unknown";

  const isFavorite = isFav(charId);

  const handleFav = () => {
    toggleFav({
      id: charId,
      name: charName,
      image: character.image,
      status: charStatus,
      firstSeen: character.firstSeen ?? "Creado por ti",
      lastSeen: character.lastSeen ?? "Creado por ti",
      isCreate: true,
    });
  };

  const handleDelete = () => {
    LocalStorageService.deleteCharacter(charId).then(() => {
      addToast("Personaje eliminado", "success");
      navigate({ to: "/" });
    }).catch(() => {
      addToast("Error al eliminar el personaje", "error");
      setShowConfirm(false);
    });
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate({ to: "/" });
    }
  };

  const avatarUrl = character.image
    ? character.image
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(charName)}&background=7c3aed&color=fff&size=300`;

  return (
    <div className="character-detail-div user-character-detail">
      <div className="user-character-top-bar">
        <button className="back-button" onClick={handleGoBack}>
          <FaArrowLeft />
        </button>

        <div className="character-actions-top">
          <button
            className="btn-edit"
            onClick={() => navigate({ to: "/edit/$id", params: { id: charId } })}
          >
            <FaEdit /> Editar
          </button>
          <button className="btn-delete" onClick={() => setShowConfirm(true)}>
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>

      <section className="character-header">
        <img src={avatarUrl} alt={charName} className="character-image" />

        <div className="character-info">
          <span onClick={handleFav} className="fav-btn">
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </span>

          <p>
            <span className="label">Nombre:</span>{" "}
            <strong>{charName}</strong>
          </p>

          <p>
            <span className="label">Especie:</span> {character.species}
          </p>

          <p className={charStatus}>
            <span className="label">Estado:</span> {charStatus}
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
            DETALLES
          </button>
          <button
            className={activeTab === "ubicacion" ? "active" : ""}
            onClick={() => setActiveTab("ubicacion")}
          >
            UBICACIÓN
          </button>
        </nav>

        <div className="character-content">
          {activeTab === "detalles" && (
            <p>
              {character.origin?.name
                ? <>Este personaje tiene origen en <strong>{character.origin.name}</strong>.</>
                : "Sin información de origen disponible."}
            </p>
          )}
          {activeTab === "ubicacion" && (
            <p>
              {character.location?.name
                ? <>Este personaje se encuentra actualmente en <strong>{character.location.name}</strong>.</>
                : "Sin información de ubicación disponible."}
            </p>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={showConfirm}
        title="Eliminar personaje"
        message={`¿Estás seguro de eliminar a "${charName}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        variant="danger"
      />
    </div>
  );
};
