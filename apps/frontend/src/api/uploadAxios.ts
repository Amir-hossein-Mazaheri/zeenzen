import axios from "axios";

const uploadAxios = axios.create({
  baseURL: "http://localhost:4000/uploads",
  withCredentials: true,
});

export default uploadAxios;
