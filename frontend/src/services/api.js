import axios from "axios";

const API = axios.create({
  baseURL: "https://web-production-c139e.up.railway.app/api",
});

export default API;