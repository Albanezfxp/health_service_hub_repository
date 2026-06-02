import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  // Função isolada para podermos chamar sempre que necessário
  async function checkAuth() {
    const token = await AsyncStorage.getItem("userId");
    setIsLogged(!!token);
  }

  // Verifica ao montar o app
  useEffect(() => {
    checkAuth();
  }, []);

  // Monitora a mudança de rotas para garantir o bloqueio/permissão
  useEffect(() => {
    // Sempre que o usuário mudar de tela, revalida o token para evitar dessincronização
    checkAuth().then(() => {
      if (isLogged === null) return;

      const inTabs = segments[0] === "(tabs)";

      // 🔴 NÃO LOGADO e tentando acessar área interna → LOGIN
      if (!isLogged && inTabs) {
        router.replace("/login");
      }

      // 🟢 LOGADO e tentando acessar tela de login/externa → DASHBOARD
      if (isLogged && !inTabs) {
        router.replace("/(tabs)/dashboard");
      }
    });
  }, [segments, isLogged]); // Adicionado o isLogged e segments como gatilhos

  if (isLogged === null) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
