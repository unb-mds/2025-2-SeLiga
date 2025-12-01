import axios from 'axios';

// Tenta pegar a URL de uma variável de ambiente. 
// Se não existir (ex: rodando local sem docker), usa o localhost:8000 como padrão.
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: baseURL
});

export default api;