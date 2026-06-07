import EquipamentoCard from "@/components/Equipamentos/EquipamentoCard";
import EquipamentoForm from "@/components/Equipamentos/EquipamentoForm";
import {
    fetchCreateEquipamento,
    fetchDeleteEquipamento,
    fetchEquipamentos,
    fetchUpdateEquipamento,
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

export default function EquipamentoScreen() {
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] =
    useState<any>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
  try {
    console.log("INICIOU CARREGAR");

    setLoading(true);

    const dados = await fetchEquipamentos();

    console.log("DADOS RECEBIDOS:", dados);

    setEquipamentos(dados);
  } catch (error: any) {
    console.log("ERRO EQUIPAMENTOS:", error?.response?.data);
    console.log("STATUS:", error?.response?.status);
    console.log("ERRO COMPLETO:", error);

    Alert.alert("Erro", "Falha ao carregar equipamentos");
  } finally {
    console.log("FINALMENTE");
    setLoading(false);
  }
}

  async function handleSave(dados: any) {
    try {
      if (equipamentoSelecionado) {
        await fetchUpdateEquipamento(
          equipamentoSelecionado.id,
          dados,
        );

        Alert.alert(
          "Sucesso",
          "Equipamento atualizado com sucesso",
        );
      } else {
        await fetchCreateEquipamento(dados);

        Alert.alert(
          "Sucesso",
          "Equipamento cadastrado com sucesso",
        );
      }

      setModalVisible(false);
      setEquipamentoSelecionado(null);

      await carregar();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao salvar equipamento");
    }
  }

  async function handleDelete(id: string) {
    Alert.alert(
      "Excluir",
      "Deseja realmente excluir este equipamento?",
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
              await fetchDeleteEquipamento(id);

              await carregar();

              Alert.alert(
                "Sucesso",
                "Equipamento removido",
              );
            } catch (error) {
              console.log(error);
              Alert.alert(
                "Erro",
                "Falha ao excluir equipamento",
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
        <Text style={styles.title}>⚙️ Equipamentos</Text>

        <Text style={styles.subtitle}>
          Gerenciamento de equipamentos
        </Text>
      </View>

      <FlatList
        data={equipamentos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <EquipamentoCard
            item={item}
            onEdit={() => {
              setEquipamentoSelecionado(item);
              setModalVisible(true);
            }}
            onDelete={handleDelete}
          />
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() => {
          setEquipamentoSelecionado(null);
          setModalVisible(true);
        }}
      >
        <Ionicons
          name="add"
          size={30}
          color="#FFF"
        />
      </Pressable>

      <EquipamentoForm
        visible={modalVisible}
        equipamento={equipamentoSelecionado}
        onClose={() => {
          setModalVisible(false);
          setEquipamentoSelecionado(null);
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