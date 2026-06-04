import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import UnidadeCard from "../components/Hospital/HospitalCard";
import HospitalForm from "../components/Hospital/HospitalForm";

import { ambulatorioApi, hospitalApi } from "@/services/api";
import { COLORS } from "@/theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HospitalScreen() {
  const [hospitais, setHospitais] = useState<any[]>([]);
  const [ambulatorios, setAmbulatorios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [abaAtiva, setAbaAtiva] = useState<"hospitais" | "ambulatorios">("hospitais");

  const slideRef = useRef<ScrollView>(null);
  const isProgrammaticScroll = useRef(false);

  const [selectionModalVisible, setSelectionModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [tipoCadastro, setTipoCadastro] = useState<"hospital" | "ambulatorio" | null>(null);

  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);

      const [h, a] = await Promise.all([
        hospitalApi.getAll().catch(() => []),
        ambulatorioApi.getAll().catch(() => []),
      ]);

      setHospitais(h);
      setAmbulatorios(a);
    } finally {
      setLoading(false);
    }
  }

  async function atualizar() {
    if (abaAtiva === "hospitais") {
      setHospitais(await hospitalApi.getAll());
    } else {
      setAmbulatorios(await ambulatorioApi.getAll());
    }
  }

  function trocarAba(aba: "hospitais" | "ambulatorios") {
    if (aba === abaAtiva) return;

    isProgrammaticScroll.current = true;
    setAbaAtiva(aba);

    slideRef.current?.scrollTo({
      x: aba === "hospitais" ? 0 : SCREEN_WIDTH,
      animated: true,
    });

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 300);
  }

  function onScroll(event: any) {
    if (isProgrammaticScroll.current) return;

    const page = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );

    setAbaAtiva(page === 0 ? "hospitais" : "ambulatorios");
  }

  function abrirForm(tipo: "hospital" | "ambulatorio", item?: any) {
    setTipoCadastro(tipo);
    setItemSelecionado(item || null);
    setSelectionModalVisible(false);
    setModalVisible(true);
  }

  async function handleSave(dados: any) {
    try {
      // =========================
      // EDITAR AMBOS
      // =========================

      if (itemSelecionado) {
        if (tipoCadastro === "ambulatorio") {
          await ambulatorioApi.update(itemSelecionado.id, dados);
          Alert.alert("Sucesso", "Ambulatório atualizado!");
        } else {
          await hospitalApi.update(itemSelecionado.id, dados);
          Alert.alert("Sucesso", "Hospital atualizado!");
        }
      } 
      // =========================
      // CRIAR
      // =========================
      else {
        if (tipoCadastro === "ambulatorio") {
          await ambulatorioApi.create(dados);
          Alert.alert("Sucesso", "Ambulatório criado!");
        } else {
          await hospitalApi.create(dados);
          Alert.alert("Sucesso", "Hospital criado!");
        }
      }

      setModalVisible(false);
      setItemSelecionado(null);
      await atualizar();
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao salvar");
    }
  }

  async function handleDelete(id: string) {
    try {
      if (abaAtiva === "hospitais") {
        await hospitalApi.delete(id);
      } else {
        await ambulatorioApi.delete(id);
      }

      await atualizar();
    } catch {
      Alert.alert("Erro", "Falha ao deletar");
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

      <View style={styles.header}>
        <Text style={styles.title}>
          {abaAtiva === "hospitais" ? "🏥 Hospitais" : "🩺 Ambulatórios"}
        </Text>

        <Text style={styles.subtitle}>Gestão de unidades de saúde</Text>
      </View>

      <View style={styles.shortcutRow}>
        {[
          { id: "hospitais", label: "Hospitais" },
          { id: "ambulatorios", label: "Ambulatórios" },
        ].map((item) => (
          <Pressable
            key={item.id}
            onPress={() => trocarAba(item.id as any)}
            style={styles.shortcutCard}
          >
            <Text>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.page}>
          <FlatList
            data={hospitais}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UnidadeCard
                item={item}
                onDelete={handleDelete}
                onEdit={() => abrirForm("hospital", item)}
              />
            )}
          />
        </View>

        <View style={styles.page}>
          <FlatList
            data={ambulatorios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UnidadeCard
                item={item}
                onDelete={handleDelete}
                onEdit={() => abrirForm("ambulatorio", item)}
              />
            )}
          />
        </View>
      </ScrollView>

      {/* BOTÃO + */}
      <Pressable
        style={styles.fab}
        onPress={() =>
          setSelectionModalVisible(true)
        }
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </Pressable>

      {/* MODAL TIPO */}
      <Modal visible={selectionModalVisible} transparent>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={() => abrirForm("hospital")}>
              <Text>Hospital</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => abrirForm("ambulatorio")}>
              <Text>Ambulatório</Text>
            </TouchableOpacity>

            <Pressable onPress={() => setSelectionModalVisible(false)}>
              <Text>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* FORM */}
      <HospitalForm
        visible={modalVisible}
        tipo={tipoCadastro}
        hospital={itemSelecionado}
        hospitaisDisponiveis={hospitais}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9F9", paddingTop: 50 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 20, backgroundColor: COLORS.primary },
  title: { color: "#FFF", fontSize: 22 },
  subtitle: { color: "#FFF" },
  shortcutRow: { flexDirection: "row" },
  shortcutCard: { flex: 1, padding: 10, backgroundColor: "#FFF" },
  page: { width: SCREEN_WIDTH - 32 },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: "#FFF", padding: 20, borderRadius: 10 },
});