import http from './httpService';

interface CharactersResponse {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
}

interface Data {
  data: Results;
}

interface Results {
  total: number;
  offset: number;
  count: number;
  results: Array<Character>;
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

interface UrlItems {
  type: string;
  url: string;
}

interface QueryParams {
  offset: number;
  limit: number;
  name?: string;
}

const endpoint = 'characters';
const publicApiKey = process.env.REACT_APP_PUBLIC_API_KEY;

const getCharacters = async (
  queryParams?: QueryParams,
): Promise<CharactersResponse> => {
  const params = { ...queryParams, apikey: publicApiKey };
  return http.get(endpoint, { params });
};

export default {
  getCharacters,
};
