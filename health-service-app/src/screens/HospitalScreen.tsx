import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HospitalCard from "../components/Login/Hospital/HospitalCard";
import { Hospital } from "@/types/interfaces/Hospital";
import {
  createHospital,
  deleteHospital,
  getHospitais,
  updateHospital,
} from "@/services/hospital.service";
import { COLORS } from "@/theme/colors";
import HospitalForm from "../components/Login/Hospital/HospitalForm";

export default function HospitalScreen() {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [hospitalSelecionado, setHospitalSelecionado] =
    useState<Hospital | null>(null);

  useEffect(() => {
    carregarHospitais();
  }, []);

  async function carregarHospitais() {
    try {
      setLoading(true);
      const data = await getHospitais();
      setHospitais(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os hospitais.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert("Excluir Hospital", "Deseja realmente excluir este hospital?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteHospital(id);
            carregarHospitais();
          } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  }

  function handleEdit(hospital: Hospital) {
    setHospitalSelecionado(hospital);
    setModalVisible(true);
  }

  async function handleSave(dados: {
    nome: string;
    endereco: string;
    capacidade?: number;
  }) {
    try {
      if (hospitalSelecionado) {
        // UPDATE
        await updateHospital(hospitalSelecionado.id, dados);
      } else {
        // CREATE ✅
        await createHospital(dados as any);
      }

      setModalVisible(false);
      setHospitalSelecionado(null);
      await carregarHospitais();

      Alert.alert("Sucesso", "Hospital salvo com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar hospital:", error);
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HERO HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🏥 Hospitais</Text>
        <Text style={styles.subtitle}>Gestão inteligente e centralizada</Text>

        <View style={styles.headerStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{hospitais.length}</Text>
            <Text style={styles.statLabel}>Unidades</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Ativo</Text>
            <Text style={styles.statLabel}>Sistema</Text>
          </View>
        </View>
      </View>

      {/* SHORTCUTS */}
      <View style={styles.shortcutRow}>
        {[
          { icon: "medical", label: "Ambulatórios", color: "#2E7D32" },
          { icon: "business", label: "Hospitais", color: "#FFF", active: true },
          { icon: "people", label: "Médicos", color: "#1565C0" },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.shortcutCard,
              item.active && styles.activeShortcutCard,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[
                styles.iconBg,
                item.active
                  ? { backgroundColor: "rgba(255,255,255,0.2)" }
                  : { backgroundColor: "#F3F4F6" },
              ]}
            >
              <Ionicons name={item.icon as any} size={22} color={item.color} />
            </View>

            <Text
              style={[styles.shortcutText, item.active && { color: "#FFF" }]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* LISTA */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Unidades Cadastradas</Text>
          <Text style={styles.listCounter}>{hospitais.length} total</Text>
        </View>

        <FlatList
          data={hospitais}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 12 }}>
              <HospitalCard
                hospital={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="medkit-outline"
                size={48}
                color={COLORS.primary}
              />
              <Text style={styles.emptyTitle}>Nenhum hospital ainda</Text>
              <Text style={styles.emptyText}>
                Comece cadastrando sua primeira unidade
              </Text>
            </View>
          }
        />
      </View>

      {/* FAB */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
        onPress={() => {
          setHospitalSelecionado(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </Pressable>

      <HospitalForm
        visible={modalVisible}
        hospital={hospitalSelecionado}
        onClose={() => {
          setModalVisible(false);
          setHospitalSelecionado(null);
        }}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F9",
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // HEADER
  header: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: COLORS.primary,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFF",
  },

  subtitle: {
    fontSize: 14,
    color: "#E5E7EB",
    marginTop: 4,
  },

  headerStats: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },

  statBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 12,
  },

  statNumber: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  statLabel: {
    color: "#E5E7EB",
    fontSize: 12,
  },

  // SHORTCUTS
  shortcutRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  shortcutCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 6,
  },

  activeShortcutCard: {
    backgroundColor: COLORS.primary,
  },

  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  shortcutText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  // LISTA
  listContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 14,
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  listTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  listCounter: {
    fontSize: 12,
    color: "#6B7280",
  },

  listContent: {
    paddingBottom: 100,
  },

  // EMPTY
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 8,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  emptyText: {
    fontSize: 12,
    color: "#6B7280",
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  // INTERAÇÕES
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },
});
