export const Card = ({className,ImgCharacter}) =>{
    return(
        <article className={className}>
            <header className="imagen">
                <img src={ImgCharacter} alt="" />
            </header>
            <div className="infoPersonaje">
                <strong><p>Nombre</p></strong>
                <strong><p>Estado</p></strong>
                <p>Visto por Primera vez en la tierra</p>
                <p>Visto por ultima vez en el lago</p>
            </div>
            <footer>
                <button>Ver Personaje</button>
            </footer>
        </article>
    )
}