import { Ambulatorio } from "@/types/interfaces/Ambulatorio";
import { Hospital } from "@/types/interfaces/Hospital";
import { LoginUserRequest } from "@/types/interfaces/LoginUserRequest";
import { RegisterUserRequest } from "@/types/interfaces/RegisterUserRequest";
import axios from "axios";

type CreateHospitalDTO = {
  nome: string;
  endereco: string;
  capacidade?: number;
};

const getBaseURL = () => {
  return "http://192.168.0.6:3000";
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
    // Interceptor inteligente: Mostra exatamente qual campo falhou na validação do NestJS
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

export const fetchRegisterUser = async (payload: RegisterUserRequest) => {
  const response = await api.post("/users/register", payload);
  return response.data;
};

export const fetchLogin = async (payload: LoginUserRequest) => {
  const response = await api.post("/users/login", payload);
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const fetchHospitais = async () => {
  const response = await api.get("/hospitais");
  return response.data;
};

export const fetchCreateHospital = async (
  payload: CreateHospitalDTO,
): Promise<Hospital> => {
  const response = await api.post("/hospitais", payload);
  return response.data;
};

export const fetchAmbulatorios = async () => {
  const response = await api.get("/ambulatorios");
  return response.data;
};

export const fetchCreateAmbulatorio = async (
  payload: Ambulatorio,
): Promise<Ambulatorio> => {
  const response = await api.post("/ambulatorios", payload);
  return response.data;
};

export const fetchUpdateHospital = async (id: string, payload: any) => {
  const response = await api.put(`/hospitais/${id}`, payload);
  return response.data;
};

export const fetchDeleteHospital = async (id: string) => {
  const response = await api.delete(`/hospitais/${id}`);
  return response.data;
};

export const fetchUpdateAmbulatorio = async (id: string, payload: any) => {
  const response = await api.put(`/ambulatorios/${id}`, payload);
  return response.data;
};

export const fetchDeleteAmbulatorio = async (id: string) => {
  const response = await api.delete(`/ambulatorios/${id}`);
  return response.data;
};

export const fetchMedicos = async () => {
  const response = await api.get("/medicos");
  return response.data;
};

export const fetchCreateMedico = async (payload: any) => {
  return await api.post("/medicos", payload);
};

export const fetchUpdateMedico = async (id: string, payload: any) => {
  const response = await api.put(`/medicos/${id}`, payload);
  return response.data;
};

export const fetchDeleteMedico = async (id: string) => {
  const response = await api.delete(`/medicos/${id}`);
  return response.data;
};

export const fetchCreateMedicoResidente = async (payload: any) => {
  const response = await api.post("/medicos-residentes", payload);
  return response.data;
};

export const fetchCreateMedicoEfetivo = async (payload: any) => {
  const response = await api.post("/medicos-efetivos", payload);
  return response.data;
};

export const fetchCreateMedicoLotacao = async (payload: any) => {
  const response = await api.post("/medicos-lotacoes", payload);
  return response.data;
};

export const fetchCreateCarteiraFuncional = async (payload: any) => {
  const response = await api.post("/carteiras-funcionais", payload);
  return response.data;
};

export const fetchUpdateCarteiraFuncional = async (
  id: string,
  payload: any,
) => {
  const response = await api.put(`/carteiras-funcionais/${id}`, payload);
  return response.data;
};

export const fetchEquipamentos = async () => {
  const response = await api.get("/equipamentos");
  return response.data;
};

export const fetchCreateEquipamento = async (payload: any) => {
  const response = await api.post("/equipamentos", payload);
  return response.data;
};

export const fetchUpdateEquipamento = async (
  id: string,
  payload: any,
) => {
  const response = await api.put(`/equipamentos/${id}`, payload);
  return response.data;
};

export const fetchDeleteEquipamento = async (id: string) => {
  const response = await api.delete(`/equipamentos/${id}`);
  return response.data;
};

export const fetchAuditorias = async () => {
  const response = await api.get("/auditorias");
  return response.data;
};

export const fetchCreateAuditoria = async (payload: any) => {
  const response = await api.post("/auditorias", payload);
  return response.data;
};

export const fetchUpdateAuditoria = async (
  id: string,
  payload: any,
) => {
  const response = await api.put(`/auditorias/${id}`, payload);
  return response.data;
};

export const fetchDeleteAuditoria = async (id: string) => {
  const response = await api.delete(`/auditorias/${id}`);
  return response.data;
};

export const fetchMedicosEfetivos = async () => {
  const response = await api.get("/medicos-efetivos");
  return response.data;
};

export const fetchRequisicoesEquipamento = async () => {
  const response = await api.get("/requisicoes-equipamentos");
  return response.data;
};

export const fetchCreateRequisicaoEquipamento = async (
  payload: any,
) => {
  const response = await api.post(
    "/requisicoes-equipamentos",
    payload,
  );

  return response.data;
};

export const fetchUpdateRequisicaoEquipamento = async (
  id: string,
  payload: any,
) => {
  const response = await api.put(
    `/requisicoes-equipamentos/${id}`,
    payload,
  );

  return response.data;
};

export const fetchDeleteRequisicaoEquipamento = async (
  id: string,
) => {
  const response = await api.delete(
    `/requisicoes-equipamentos/${id}`,
  );

  return response.data;
};