import ImagenCarga from "../../assets/cargando.png";
import './modalCarga.scss'

interface PropsModal {
  mensaje: string;
}

export const ModalCarga = ({ mensaje }: PropsModal) => {
  return (
    <section
      className="modal-cargando"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-loading-message"
    >
      <div className="modal-content">
        <h2 id="modal-loading-message" className="mensaje">
          {mensaje}
        </h2>
        <img
          className="img-cargando"
          src={ImagenCarga}
          alt="Cargando contenido de Rick and Morty..."
        />
      </div>
    </section>
  );
};
