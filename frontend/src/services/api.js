import axios from "axios";

const API = axios.create({
  baseURL: "https://web-production-c139e.up.railway.app/api",
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  const authRoutes = [
    "/auth/login/",
    "/auth/register/",
  ];

  const isAuthRoute = authRoutes.some((route) =>
    req.url.includes(route)
  );

  if (token && !isAuthRoute) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;