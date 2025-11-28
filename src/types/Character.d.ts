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
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
  episode?: Episode[];
}

export interface ExtendedCharacter extends Character {
  firstSeen?: string;
  lastSeen?: string;
  isCreate?: boolean;
  isFavorito?: boolean;
}


export interface CharacterDetallesProps {
  image: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: string;
  location: string;
  isFavorito: boolean;
  isCreate: boolean;
  episodes: Episode[];
}

export interface CardProps {
  isFavorito: boolean;
  id: number,
  isCreate: boolean;
  ImgCharacter: string;
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
  page?: number,
  status?: string,
  species?: string,
  type?: string
  name?: string,
  gender?: string
} 



// tipos para el formulario y el personaje creado

export interface NewCharacter {
  name: string;
  gender: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  image?: File;
  type?: string;
}

export interface FormCharacter {
  nombre: string;
  genero: string;
  estado: string;
  especie: string;
  tipo: string;
  origen: string;
  imagen?: File;
}

