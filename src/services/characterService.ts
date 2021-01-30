import {
  CharactersResponse,
  MediaResponse,
  QueryParams,
} from '../interfaces/character';

import http from './httpService';

const endpoint = 'characters';
const publicApiKey = process.env.REACT_APP_PUBLIC_API_KEY;

const getCharacters = async (
  queryParams?: QueryParams,
): Promise<CharactersResponse> => {
  const params = { ...queryParams, apikey: publicApiKey };
  return http.get(endpoint, { params });
};

const getCharacter = async (id: string): Promise<CharactersResponse> => {
  const params = { apikey: publicApiKey };
  return http.get(`${endpoint}/${id}`, { params });
};

const getCharacterMedia = async (
  id: string,
  media: string,
  queryParams?: QueryParams,
): Promise<MediaResponse> => {
  const params = { ...queryParams, apikey: publicApiKey };
  return http.get(`${endpoint}/${id}/${media}`, { params });
};

export default {
  getCharacters,
  getCharacter,
  getCharacterMedia,
};
