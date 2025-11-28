import { Select } from '@headlessui/react'
import { useCharacterStore } from '../../stores/charactersStore'

export const Filtro = () => {
  const { status, species, name, type, gender, source, set, clearCharacters } = useCharacterStore()

  const applyFilter = (key, value) => {
    clearCharacters();

    if (value === "" || value === "default") {
      set({ [key]: undefined, page: 1 });
      return;
    }

    set({ [key]: value, page: 1 });
  };

  const handleSource = (value) => {
    clearCharacters();
    set({ source: value, page: 1 });
  };

  const handleSearch = (value) => {
    clearCharacters();
    set({ name: value, page: 1 });
  };

  return (
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
          name="source"
          id="source"
          value={source}
          onChange={(e) => handleSource(e.target.value)}
        >
          <option value="api">API Original</option>
          <option value="local">Personajes Creados</option>
        </Select>

        <Select
          name="status"
          id="status"
          value={status ?? "default"}
          onChange={(e) => applyFilter("status", e.target.value)}
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
          onChange={(e) => applyFilter("species", e.target.value)}
        >
          <option value="default">Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="unknown">Unknown</option>
        </Select>

        <Select
          name="type"
          id="type"
          value={type ?? ""}
          onChange={(e) => applyFilter("type", e.target.value)}
        >
          <option value="">Type</option>
          <option value="robot">Robot</option>
          <option value="parasite">Parasite</option>
          <option value="superHuman">Super Human</option>
        </Select>

        <Select
          name="gender"
          id="gender"
          value={gender ?? ""}
          onChange={(e) => applyFilter("gender", e.target.value)}
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
