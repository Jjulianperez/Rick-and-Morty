import { Select } from '@headlessui/react'

export const Filtro = () =>{
    return(
        
        <article className='filters'>

            <div className='search'>
                <input type="text" placeholder='Buscar Personaje' />
            </div>
            
            <Select name="status" id="status">
                <option value="live">Vivo</option>
                <option value="Human-with-antennae">Human with antennae</option>
            </Select>

            <Select name="species" id="species">
                <option value="human">Humano</option>
                <option value="alien">Alien</option>
                <option value="unknown">Desconocido</option>
            </Select>

            <Select name="status" id="status">
                <option value="live">Vivo</option>
                <option value="dead">Muerto</option>
                <option value="unknown">Desconocido</option>
            </Select>
        </article>
    )
}