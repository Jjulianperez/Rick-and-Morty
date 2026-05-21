export interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

export interface Character {
  id: number;
  name?: string;
  image?: string;
  species?: string;
  status?: string;
  gender?: string;
  type?: string;
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
  episode?: Episode[] | string[];
}

export interface ExtendedCharacter extends Character {
  firstSeen?: string;
  lastSeen?: string;
  isCreate?: boolean;
  isFavorito?: boolean;
}

export interface CardProps {
  isFavorito: boolean;
  id: string;
  isCreate: boolean;
  ImgCharacter?: string;
  name: string;
  status: string;
  firstSeen: string;
  lastSeen: string;
}

export interface Info {
  count?: number;
  pages?: number;
  next?: string | null;
  prev?: string | null;
}
export interface CharacterResponse {
  info: Info;
  results: ExtendedCharacter[];
}

export interface CharactersParams {
  page?: number;
  status?: string;
  species?: string;
  type?: string;
  name?: string;
  gender?: string;
}

export interface NewCharacter {
  name: string;
  gender: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  image?: string;
  type?: string;
  isFavorito?: boolean;
}

export interface FormCharacter {
  nombre: string;
  genero: string;
  estado: string;
  especie: string;
  tipo: string;
  origen: string;
  imagen?: string;
}
