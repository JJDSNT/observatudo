import axios from 'axios';

const baseURL = process.env.BASE_URL;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 404) {
        // Trate o erro 404 aqui
      }
      return Promise.reject(error);
    }
  );

export default httpClient;
