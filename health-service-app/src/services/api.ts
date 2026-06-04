import axios from "axios";
import { Platform } from "react-native";

import { Ambulatorio } from "@/types/interfaces/Ambulatorio";
import { Hospital } from "@/types/interfaces/Hospital";
import { LoginUserRequest } from "@/types/interfaces/LoginUserRequest";
import { RegisterUserRequest } from "@/types/interfaces/RegisterUserRequest";

/**
 * =========================
 * BASE CONFIG
 * =========================
 */

const getBaseURL = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
  }
  return "http://192.168.0.6:3000";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 400000,
});

/**
 * =========================
 * INTERCEPTOR
 * =========================
 */

api.interceptors.response.use(
  (response) => {
    console.log("✅ API OK:", response.status);
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      console.log(
        "❌ Erro 400 - Detalhes do Backend:",
        JSON.stringify(error.response.data, null, 2),
      );
    } else {
      console.log("❌ API Erro:", error.message);
    }
    return Promise.reject(error);
  },
);

/**
 * =========================
 * AUTH API
 * =========================
 */

export const authApi = {
  register: async (payload: RegisterUserRequest) => {
    const { data } = await api.post("/users/register", payload);
    return data;
  },

  login: async (payload: LoginUserRequest) => {
    const { data } = await api.post("/users/login", payload);
    return data;
  },
};

export const fetchLogin = authApi.login;
export const fetchRegisterUser = authApi.register;

/**
 * =========================
 * USER API
 * =========================
 */

export const userApi = {
  getById: async (id: string) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
};

/**
 * =========================
 * HOSPITAL API
 * =========================
 */

export const hospitalApi = {
  getAll: async (): Promise<Hospital[]> => {
    const { data } = await api.get("/hospitais");
    return data;
  },

  create: async (payload: Partial<Hospital>) => {
    const { data } = await api.post("/hospitais", payload);
    return data;
  },

  update: async (id: string, payload: Partial<Hospital>) => {
    const { data } = await api.put(`/hospitais/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/hospitais/${id}`);
    return data;
  },
};

/**
 * =========================
 * AMBULATORIO API (🔥 AGORA COM UPDATE)
 * =========================
 */

export const ambulatorioApi = {
  getAll: async (): Promise<Ambulatorio[]> => {
    const { data } = await api.get("/ambulatorios");
    return data;
  },

  create: async (payload: Ambulatorio) => {
    const { data } = await api.post("/ambulatorios", payload);
    return data;
  },

  update: async (id: string, payload: Partial<Ambulatorio>) => {
    const { data } = await api.put(`/ambulatorios/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/ambulatorios/${id}`);
    return data;
  },
};