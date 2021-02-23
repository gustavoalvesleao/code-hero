// Character interface
export interface CharactersResponse {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: CharacterData;
}

interface CharacterData {
  data: Results<Character>;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: CharacterMaterial;
  series: CharacterMaterial;
  stories: CharacterMaterial;
  events: CharacterMaterial;
  urls: Array<UrlItems>;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

interface CharacterMaterial {
  available: number;
  collectionURI: string;
  items: Array<CharacterMaterialItems>;
  returned: number;
}

export interface CharacterMaterialItems {
  resourceURI: string;
  name: string;
}

export interface UrlItems {
  type: string;
  url: string;
}

export interface QueryParams {
  offset?: number;
  limit: number;
  nameStartsWith?: string;
}

// Character Media interface
export interface MediaResponse {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: MediaData;
}

interface MediaData {
  data: Results<Media>;
}

export interface Media {
  title: string;
  thumbnail: Thumbnail;
  urls: Array<UrlItems>;
}

// Generic interfaces
interface Results<T> {
  total: number;
  offset: number;
  count: number;
  results: Array<T>;
}

export interface PromiseSettled<T> {
  status: string;
  value: T;
}
