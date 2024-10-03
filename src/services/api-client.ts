import axios from "axios";

export const conexionSeguridad = axios.create({
  baseURL: import.meta.env.VITE_SEGURIDAD_API,
});

export const conexionSistema = axios.create({
  baseURL: import.meta.env.VITE_SISTEMA_API,
});
