import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AuditoriaCard from "@/components/Auditorias/AuditoriaCard";
import AuditoriaForm from "@/components/Auditorias/AuditoriaForm";

import {
  fetchAuditorias,
  fetchCreateAuditoria,
  fetchDeleteAuditoria,
  fetchUpdateAuditoria,
} from "@/services/api";

import { COLORS } from "@/theme/colors";

export default function AuditoriaScreen() {
  const [auditorias, setAuditorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [auditoriaSelecionada, setAuditoriaSelecionada] =
    useState<any>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);

      const dados = await fetchAuditorias();

      setAuditorias(dados);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Falha ao carregar auditorias",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(dados: any) {
    try {
      if (auditoriaSelecionada) {
        await fetchUpdateAuditoria(
          auditoriaSelecionada.id,
          dados,
        );

        Alert.alert(
          "Sucesso",
          "Auditoria atualizada com sucesso",
        );
      } else {
        await fetchCreateAuditoria(dados);

        Alert.alert(
          "Sucesso",
          "Auditoria cadastrada com sucesso",
        );
      }

      setModalVisible(false);
      setAuditoriaSelecionada(null);

      await carregar();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Falha ao salvar auditoria",
      );
    }
  }

  async function handleDelete(id: string) {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir esta auditoria?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await fetchDeleteAuditoria(id);

              await carregar();

              Alert.alert(
                "Sucesso",
                "Auditoria removida",
              );
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Erro",
                "Falha ao excluir auditoria",
              );
            }
          },
        },
      ],
    );
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>📋 Auditorias</Text>

        <Text style={styles.subtitle}>
          Gerenciamento de auditorias
        </Text>
      </View>

      <FlatList
        data={auditorias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <AuditoriaCard
            item={item}
            onEdit={() => {
              setAuditoriaSelecionada(item);
              setModalVisible(true);
            }}
            onDelete={handleDelete}
          />
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() => {
          setAuditoriaSelecionada(null);
          setModalVisible(true);
        }}
      >
        <Ionicons
          name="add"
          size={30}
          color="#FFF"
        />
      </Pressable>

      <AuditoriaForm
        visible={modalVisible}
        auditoria={auditoriaSelecionada}
        onClose={() => {
          setModalVisible(false);
          setAuditoriaSelecionada(null);
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
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "#E5E7EB",
    marginTop: 4,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    elevation: 5,
  },
});