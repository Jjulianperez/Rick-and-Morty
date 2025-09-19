export const Filtro = () =>{
    return(
        <article className='filters'>

            <div className='search'>
                <input type="text" placeholder='Buscar Personaje' />
            </div>
            
            <select name="status" id="status">
                <option value="live">Vivo</option>
                <option value="Human-with-antennae">Human with antennae</option>
            </select>

            <select name="species" id="species">
                <option value="human">Humano</option>
                <option value="alien">Alien</option>
                <option value="unknown">Desconocido</option>
            </select>

            <select name="status" id="status">
                <option value="live">Vivo</option>
                <option value="dead">Muerto</option>
                <option value="unknown">Desconocido</option>
            </select>
        </article>
    )
}