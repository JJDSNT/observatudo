import axios from 'axios';
import useSWR from 'swr';

const baseURL = process.env.BASE_URL;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useFetch<Data = any, Error = any, isLoading = any>(url: string) {
  const { data, error, isLoading } = useSWR<Data, Error>(url, async (url: string) => {
    const response = await httpClient.get(url);
    return response.data;
  })

  return { data, error }
}

//usar os parametros de isloading e error do swr

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

