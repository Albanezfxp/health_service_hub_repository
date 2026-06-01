// src/screens/DashboardScreen.tsx

import { View, Text, ScrollView, Animated } from "react-native";
import styles from "../styles/dashboardStyles";

import { quickActions, activities } from "../data/dashboardMock";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickAction } from "@/components/dashboard/QuickAction";
import { ActivityItem } from "@/components/dashboard/ActivityItem";

import { useEffect, useMemo, useState } from "react";

import {
  fetchAmbulatorios,
  fetchHospitais,
  fetchMedicos,
  fetchUserById,
} from "@/services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardScreen({ navigation }: any) {
  const [scaleAnim] = useState(new Animated.Value(0.9));

  const [hospitaisCount, setHospitaisCount] = useState<number | null>(null);
  const [medicosCount, setMedicosCount] = useState<number | null>(null);
  const [ambulatoriosCount, setAmbulatoriosCount] = useState<number | null>(
    null,
  );

  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  async function loadStatics() {
    try {
      const [hospitais, ambulatorios, medicos] = await Promise.all([
        fetchHospitais(),
        fetchAmbulatorios(),
        fetchMedicos(),
      ]);

      setHospitaisCount(hospitais.length);
      setAmbulatoriosCount(ambulatorios.length);
      setMedicosCount(medicos.length);
    } catch (error) {
      console.log("Erro ao carregar estatísticas", error);
    } finally {
      setLoadingStats(false);
    }
  }

  async function loadUserStatics() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Usuário não encontrado");

      const response = await fetchUserById(userId);
      setUser(response);
    } catch (error) {
      console.log("Erro ao carregar usuário", error);
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    loadStatics();
    loadUserStatics();
  }, []);

  const computedStats = useMemo(
    () => [
      {
        label: "Usuário",
        value: user ? user.nome : "...",
        icon: "person-outline",
      },
      {
        label: "Médicos",
        value: medicosCount ?? 0,
        icon: "people-outline",
      },
      {
        label: "Hospitais",
        value: hospitaisCount ?? 0,
        icon: "business-outline",
      },
      {
        label: "Ambulatórios",
        value: ambulatoriosCount ?? 0,
        icon: "medkit-outline",
      },
    ],
    [medicosCount, hospitaisCount, ambulatoriosCount, user],
  );

  const isLoading = loadingStats || loadingUser;

  // 🔥 NAVEGAÇÃO CENTRALIZADA
  function handleNavigation(label: string) {
    switch (label) {
      case "Médicos":
        navigation.navigate("Medicos");
        break;
      case "Hospitais":
        navigation.navigate("Hospitais");
        break;
      case "Ambulatórios":
        navigation.navigate("Ambulatorios");
        break;
      default:
        console.log("Tela não mapeada:", label);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Visão geral do sistema</Text>
      </View>

      {isLoading ? (
        <Text style={{ paddingHorizontal: 20 }}>
          Carregando estatísticas...
        </Text>
      ) : (
        <View style={styles.statsContainer}>
          {computedStats.map((item, index) => (
            <StatCard key={index} item={item} />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações rápidas</Text>

        <View style={styles.quickContainer}>
          {quickActions.map((action) => (
            <QuickAction
              key={action.id}
              action={action}
              onPress={() => handleNavigation(action.label)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atividades recentes</Text>

        <View style={styles.activityContainer}>
          {activities.map((item, index) => (
            <ActivityItem
              key={item.id}
              item={item}
              isLast={index === activities.length - 1}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
