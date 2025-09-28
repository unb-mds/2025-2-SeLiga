import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000"            // porta onde o backend está
});

export default api;