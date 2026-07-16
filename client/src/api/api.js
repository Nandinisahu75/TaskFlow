import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-api-e833.onrender.com/api",
});

export default API;