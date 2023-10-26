//https://blog.rocketseat.com.br/react-hook-swr-melhor-ux-no-consumo-de-api-no-front-end-react/
import axios from 'axios';
import useSWR from 'swr';

const baseURL = process.env.BASE_URL;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//usar os parametros de isloading e error do swr
export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (url: string) => {
    const response = await httpClient.get(url);
    return response.data;
  })

  return { data, error }
}


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

