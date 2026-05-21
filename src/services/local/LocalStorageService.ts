import type { NewCharacter, ExtendedCharacter } from "../../types/Character";

const STORAGE_KEY = "rickandmorty-created";

function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 10000);
}

function getAvatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=200&bold=true`;
}

function getAll(): ExtendedCharacter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(characters: ExtendedCharacter[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

const getCreateCharacter = async (): Promise<ExtendedCharacter[]> => {
  return getAll();
};

const createCharacter = async (character: NewCharacter): Promise<ExtendedCharacter> => {
  const all = getAll();
  const newChar: ExtendedCharacter = {
    id: generateId(),
    name: character.name,
    gender: character.gender,
    status: character.status,
    species: character.species,
    type: character.type,
    origin: typeof character.origin === "string"
      ? { name: character.origin }
      : character.origin,
    image: character.image || getAvatarUrl(character.name),
    isCreate: true,
    firstSeen: "Creado por ti",
    lastSeen: "Creado por ti",
  };
  all.push(newChar);
  saveAll(all);
  return newChar;
};

const updateCharacter = async (id: string, data: Partial<NewCharacter>): Promise<ExtendedCharacter> => {
  const all = getAll();
  const index = all.findIndex((c) => String(c.id) === id);
  if (index === -1) throw new Error("Personaje no encontrado");

  const origin = data.origin
    ? typeof data.origin === "string"
      ? { name: data.origin }
      : data.origin
    : all[index].origin;

  all[index] = {
    ...all[index],
    ...data,
    image: data.image || all[index].image,
    origin,
  };
  saveAll(all);
  return all[index];
};

const deleteCharacter = async (id: string): Promise<void> => {
  const all = getAll();
  saveAll(all.filter((c) => String(c.id) !== id));
};

export const LocalStorageService = {
  getCreateCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
