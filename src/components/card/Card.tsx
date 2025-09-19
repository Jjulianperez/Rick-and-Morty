type CardProps = {
  className?: string;
  ImgCharacter: string;
  name: string;
  status: string;
  firstSeen: string;
  lastSeen: string;
};

export const Card = ({ className = "character-card", ImgCharacter, name, status, firstSeen, lastSeen }: CardProps) => {
  return (
    <article className={className}>
      <img src={ImgCharacter} alt={name} />
      <div className="infoPersonaje">
        <div>
          <p className="name">{name}</p>
          <span className="status">{status}</span>
          <p className="text">Visto por primera vez en {firstSeen}</p>
          <p className="text">Visto por última vez en {lastSeen}</p>
        </div>
        <footer>
          <button>Ver Personaje</button>
        </footer>
      </div>
    </article>
  );
};
