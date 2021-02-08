// The thumbnails urls are using http. When the application is hosted
// in a https domain, warnings were being raised
import { Thumbnail, UrlItems } from '../interfaces/character';

export const urlToHttps = (url: string): string =>
  url.replace(/^http:\/\//i, 'https://');

// This function get a unique key, mostly used in map functions. This was necessary
// due some duplicated items in the info received about the characters.
// Only use this function if your elements won't change once they are displayed, for instance
// when you can add or remove items dynamically in a list
export const getUniqueKey = (cont: string, index: number): string =>
  `${cont}${index}`;

// This function builds the url to get a given thumbnail
export const buildThumbnailUrl = (
  thumbnail: Thumbnail,
  imageVariant: string,
): string =>
  `${urlToHttps(thumbnail.path)}/${imageVariant}.${thumbnail.extension}`;

// This function get an array of urls and return the value of the type passed as a parameter
export const getUrl = (CharUrls: Array<UrlItems>, type: string): string => {
  let charUrl = '';
  CharUrls.forEach((url) => {
    if (url.type === type) {
      // Remove the apikey param returned from the api
      charUrl = url.url.substring(0, url.url.indexOf('?u'));
    }
  });
  if (charUrl) return charUrl;
  CharUrls.forEach((url) => {
    if (url.type === 'detail') {
      // Remove the apikey param returned from the api
      charUrl = url.url.substring(0, url.url.indexOf('?u'));
    }
  });
  return charUrl;
};
