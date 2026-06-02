import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";

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
  const [hospitaisCount, setHospitaisCount] = useState(0);
  const [medicosCount, setMedicosCount] = useState(0);
  const [ambulatoriosCount, setAmbulatoriosCount] = useState(0);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const userId = await AsyncStorage.getItem("userId");

      const [hospitais, ambulatorios, medicos, userResponse] =
        await Promise.all([
          fetchHospitais(),
          fetchAmbulatorios(),
          fetchMedicos(),
          userId ? fetchUserById(userId) : null,
        ]);

      setHospitaisCount(hospitais.length);
      setAmbulatoriosCount(ambulatorios.length);
      setMedicosCount(medicos.length);
      setUser(userResponse);
    } catch (error) {
      console.log("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const computedStats = useMemo(
    () => [
      {
        label: "Usuário",
        value: user?.nome ?? "...",
        icon: "person-outline",
      },
      {
        label: "Médicos",
        value: medicosCount,
        icon: "people-outline",
      },
      {
        label: "Hospitais",
        value: hospitaisCount,
        icon: "business-outline",
      },
      {
        label: "Ambulatórios",
        value: ambulatoriosCount,
        icon: "medkit-outline",
      },
    ],
    [user, medicosCount, hospitaisCount, ambulatoriosCount],
  );

  function handleNavigation(label: string) {
    const routes: Record<string, string> = {
      Médicos: "Medicos",
      Hospitais: "Hospitais",
      Ambulatórios: "Ambulatorios",
    };

    const route = routes[label];
    if (route) navigation.navigate(route);
  }

  async function handleReset() {
    await AsyncStorage.removeItem("userId");
    setUser(null);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          {user ? `Bem-vindo, ${user.nome}` : "Carregando usuário..."}
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          computedStats.map((item, index) => (
            <StatCard key={index} item={item as any} />
          ))
        )}
      </View>

      {/* ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações rápidas</Text>

        <View style={styles.quickContainer}>
          {quickActions.map((action) => (
            <QuickAction
              key={action.id}
              action={action as any}
              onPress={() => handleNavigation(action.label)}
            />
          ))}
        </View>
      </View>

      {/* ACTIVITIES */}
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

      {/* RESET */}
      <Pressable
        style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
        onPress={handleReset}
      >
        <Text style={styles.resetText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}
