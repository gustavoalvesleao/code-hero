import axios from 'axios';
import { toast } from 'react-toastify';

import strings from '../locales/httpErrors';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    const expectedError =
      error.response?.status >= 400 && error.response?.status < 500;

    if (!expectedError) {
      toast.error(`${strings.unexpected} ${error}`);
    }
    return Promise.reject(error);
  },
);

const service = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

export default service;
