import { Ambulatorio } from "@/types/interfaces/Ambulatorio";
import { Hospital } from "@/types/interfaces/Hospital";
import { LoginUserRequest } from "@/types/interfaces/LoginUserRequest";
import { RegisterUserRequest } from "@/types/interfaces/RegisterUserRequest";
import axios from "axios";
import { Platform } from "react-native";

type CreateHospitalDTO = {
  nome: string;
  endereco: string;
  capacidade?: number;
};

const getBaseURL = () => {
  if (Platform.OS === "android") {
    // Mantém o IP especial que o emulador do Android Studio usa para acessar a máquina hospedeira
    return "http://10.0.2.2:3000";
  }

  // ATUALIZADO: Seu IP real atual da rede Wi-Fi (para iOS ou dispositivo físico Android)
  return "http://192.168.0.5:3000";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 400000,
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ API OK:", response.status);
    return response;
  },
  (error) => {
    console.log("❌ API Erro:", error.message);
    return Promise.reject(error);
  },
);

export const fetchRegisterUser = async (payload: RegisterUserRequest) => {
  const response = await api.post("/users/register", payload);
  return response.data;
};

export const fetchLogin = async (payload: LoginUserRequest) => {
  const response = await api.post("/users/login", payload);
  return response.data;
};

export const fetchHospitais = async () => {
  const reponse = await api.get("/hospitais");
  return reponse.data;
};

export const fetchMedicos = async () => {
  const response = await api.get("/medicos");
  return response.data;
};

export const fetchAmbulatorios = async () => {
  const response = await api.get("/ambulatorios");
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const FetchcreateHospital = async (
  payload: CreateHospitalDTO,
): Promise<Hospital> => {
  const response = await api.post("/hospitais", payload);
  return response.data;
};

export const fetchCreateAmbulatorio = async (
  payload: Ambulatorio,
): Promise<Ambulatorio> => {
  const response = await api.post("/ambulatorios", payload);
  return response.data;
};

export const fetchAmbulatorio = async () => {
  const response = await api.get("/ambulatorios");
  return response.data;
};
