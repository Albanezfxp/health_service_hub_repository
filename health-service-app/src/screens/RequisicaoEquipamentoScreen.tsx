import RequisicaoEquipamentoCard from "@/components/Requisicoes/RequisicaoEquipamentoCard";
import RequisicaoEquipamentoForm from "@/components/Requisicoes/RequisicaoEquipamentoForm";

import {
    fetchCreateRequisicaoEquipamento,
    fetchDeleteRequisicaoEquipamento,
    fetchRequisicoesEquipamento,
    fetchUpdateRequisicaoEquipamento,
} from "@/services/api";

import { COLORS } from "@/theme/colors";
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

export default function RequisicaoEquipamentoScreen() {
  const [requisicoes, setRequisicoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [
    requisicaoSelecionada,
    setRequisicaoSelecionada,
  ] = useState<any>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);

      const dados =
        await fetchRequisicoesEquipamento();

      setRequisicoes(dados);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Falha ao carregar requisições",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    dados: any,
  ) {
    try {
      if (requisicaoSelecionada) {
        await fetchUpdateRequisicaoEquipamento(
          requisicaoSelecionada.id,
          dados,
        );

        Alert.alert(
          "Sucesso",
          "Requisição atualizada com sucesso",
        );
      } else {
        await fetchCreateRequisicaoEquipamento(
          dados,
        );

        Alert.alert(
          "Sucesso",
          "Requisição cadastrada com sucesso",
        );
      }

      setModalVisible(false);
      setRequisicaoSelecionada(null);

      await carregar();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Falha ao salvar requisição",
      );
    }
  }

  async function handleDelete(
    id: string,
  ) {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir esta requisição?",
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
              await fetchDeleteRequisicaoEquipamento(
                id,
              );

              await carregar();

              Alert.alert(
                "Sucesso",
                "Requisição removida",
              );
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Erro",
                "Falha ao excluir requisição",
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
        <Text style={styles.title}>
          📋 Requisições
        </Text>

        <Text style={styles.subtitle}>
          Gerenciamento de requisições de equipamentos
        </Text>
      </View>

      <FlatList
        data={requisicoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
        }}
        refreshing={loading}
        onRefresh={carregar}
        renderItem={({ item }) => (
          <RequisicaoEquipamentoCard
            item={item}
            onEdit={() => {
              setRequisicaoSelecionada(
                item,
              );

              setModalVisible(true);
            }}
            onDelete={handleDelete}
          />
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() => {
          setRequisicaoSelecionada(
            null,
          );

          setModalVisible(true);
        }}
      >
        <Ionicons
          name="add"
          size={30}
          color="#FFF"
        />
      </Pressable>

      <RequisicaoEquipamentoForm
        visible={modalVisible}
        requisicao={
          requisicaoSelecionada
        }
        onClose={() => {
          setModalVisible(false);
          setRequisicaoSelecionada(
            null,
          );
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