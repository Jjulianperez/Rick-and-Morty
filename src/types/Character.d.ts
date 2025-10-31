export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
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
