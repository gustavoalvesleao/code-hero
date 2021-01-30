// The thumbnails urls are using http. When the application is hosted
// in a https domain, warnings were being raised
import { Thumbnail } from '../interfaces/character';

export const urlToHttps = (url: string): string =>
  url.replace(/^http:\/\//i, 'https://');

// This function get a unique key, mostly used in map functions. This was necessary
// due some duplicated items in the info received about the characters
export const getUniqueKey = (cont: string, index: number): string =>
  `${cont}-${Date.now()}-${index}`;

// This function builds the url to get a given thumbnail
export const buildThumbnailUrl = (
  thumbnail: Thumbnail,
  imageURI: string,
): string => `${urlToHttps(thumbnail.path)}/${imageURI}.${thumbnail.extension}`;
