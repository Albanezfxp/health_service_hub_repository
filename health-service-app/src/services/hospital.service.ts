import { api } from "@/services/api";
import { Hospital } from "@/types/interfaces/Hospital";

export const getHospitais = async (): Promise<Hospital[]> => {
  const response = await api.get("/hospitais");
  return response.data;
};

export const getHospitalById = async (
  id: string,
): Promise<Hospital> => {
  const response = await api.get(`/hospitais/${id}`);
  return response.data;
};

export const createHospital = async (
  payload: Omit<Hospital, "id">,
): Promise<Hospital> => {
  const response = await api.post(
    "/hospitais",
    payload,
  );

  return response.data;
};

export const updateHospital = async (
  id: string,
  payload: Partial<Hospital>,
): Promise<Hospital> => {
  const response = await api.put(
    `/hospitais/${id}`,
    payload,
  );

  return response.data;
};

export const deleteHospital = async (
  id: string,
): Promise<void> => {
  await api.delete(`/hospitais/${id}`);
};