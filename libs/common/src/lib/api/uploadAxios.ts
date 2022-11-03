import axios from 'axios';

export const uploadAxios = axios.create({
  baseURL: 'http://localhost:4000/uploads',
  withCredentials: true,
});

export default uploadAxios;
