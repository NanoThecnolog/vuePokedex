import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 5000
})

api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error(`Erro na resposta da API: ${error.response.status}`, error.response.data);
        } else if (error.request) {
            console.error('Nenhuma resposta recebida da API', error.request);
        } else {
            console.error('Erro na configuração da requisição', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;