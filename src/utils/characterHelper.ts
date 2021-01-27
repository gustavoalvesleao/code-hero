// The thumbnails urls are using http. When the application is hosted
// in a https domain, warnings were being raised
export const urlToHttps = (url: string): string =>
  url.replace(/^http:\/\//i, 'https://');

// This function get a unique key, mostly used in map functions. This was necessary
// due some duplicated items in the info received about the characters
export const getUniqueKey = (cont: string, index: number): string =>
  `${cont}-${Date.now()}-${index}`;
