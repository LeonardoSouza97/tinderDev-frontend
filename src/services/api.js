import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tindev-br.herokuapp.com/'
})

export default api;