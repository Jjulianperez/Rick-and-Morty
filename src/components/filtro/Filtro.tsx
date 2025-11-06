import { Select } from '@headlessui/react'
import { useCharacterStore } from '../../stores/charactersStore'

export const Filtro = () =>{
  
  const {status, species, name, type, gender, set, clearCharacters } = useCharacterStore()

  const handleStatus = (value: string) => {
  
    if (value === "default" || value === "") {
    clearCharacters();
    set({ status: undefined, page: 1 });

    return;
  }

  if (value === status) return
  clearCharacters();
  set({ status: value, page: 1 });
};

// ------------------------------------------------

  const handeSpecies = (value: string) => {
  if (value === "default" || value === "") {
    clearCharacters();
    set({ species: undefined, page: 1 });
    return;
  }

  if (value === species) return

  clearCharacters();
  set({ species: value, page: 1 });
};

// ---------------------------------------------

  const handleType = (value:string) =>{
    if(value === "defaut" || value === ""){
      clearCharacters()
      set({type: undefined, page: 1})
    }

    if(value === type) return
      clearCharacters()
      set({type:value, page: 1})
  }

// --------------------------------------------
const handleSearch = (e: string) =>{
  const value = e;

  console.log(value)

  clearCharacters();
  set({ name: value, page: 1 });
}

//-----------------------------------------------
  const handleGender = (value:string) =>{
    if(value === 'defaut' || value === ''){
      clearCharacters()
      set({gender: undefined, page: 1})
    }

    if(value === gender) return
    clearCharacters()
    set({gender: value, page:1})
  }



  return(
    <article className='filters'>
      <div className='search'>
        <input
          type="text"
          placeholder="Buscar Personaje"
          value={name ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <section className="filters-selects">
        <Select
          name="status"
          id="status"
          value={status ?? "default"}
          onChange={(e) => handleStatus(e.target.value)}
        >
          <option value="default">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Select>

        <Select
          name="species"
          id="species"
          value={species ?? "default"}
          onChange={(e) => handeSpecies(e.target.value)}
        >
          <option value="default">Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="unknown">Unknown</option>
        </Select>

        <Select
          name="type"
          id="type"
          value={type}
          onChange={(e) => handleType(e.target.value)}
        >
          <option value="">Type</option>
          <option value="robot">Robot</option>
          <option value="parasite">Parásite</option>
          <option value="superHuman">Super Human</option>
        </Select>

        <Select
          name="gender"
          id="gender"
          value={gender}
          onChange={(e) => handleGender(e.target.value)}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </Select>

      </section>
    </article>
  )
}
