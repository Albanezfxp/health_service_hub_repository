import { LoginUserRequest } from "@/types/interfaces/LoginUserRequest";
import { RegisterUserRequest } from "@/types/interfaces/RegisterUserRequest";
import axios from "axios";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000"; // emulador Android
  }

  return "http://192.168.0.4:3000"; // SEU IP (ajuste aqui)
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

export const fetchRegisterUser = async (payload: RegisterUserRequest) => {
  const response = await api.post("/users/register", payload);
  return response.data;
};

export const fetchLogin = async (payload: LoginUserRequest) => {
  const response = await api.post("/users/login", payload);
  return response.data;
};
