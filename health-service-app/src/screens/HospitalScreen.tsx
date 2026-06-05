import {
  fetchAmbulatorios, fetchCreateAmbulatorio, fetchCreateHospital,
  fetchDeleteHospital,
  fetchHospitais,
  fetchUpdateHospital
} from "@/services/api";
import { COLORS } from "@/theme/colors";
import { Hospital } from "@/types/interfaces/Hospital";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HospitalScreen() {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [ambulatorios, setAmbulatorios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [abaAtiva, setAbaAtiva] = useState<"hospitais" | "ambulatorios">(
    "hospitais",
  );

  const slideRef = useRef<ScrollView>(null);

  // TRAVA DE CONTROLE: Impede que o scroll dispare atualizações fantasmas durante o clique
  const isProgrammaticScroll = useRef(false);

  // Estados dos Modais
  const [selectionModalVisible, setSelectionModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState<
    "hospital" | "ambulatorio" | null
  >(null);
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null);

  useEffect(() => {
    carregarIniciais();
  }, []);

  async function carregarIniciais() {
    try {
      setLoading(true);
      const [dataHospitais, dataAmbulatorios] = await Promise.all([
        fetchHospitais().catch(() => []),
        fetchAmbulatorios().catch(() => []),
      ]);
      setHospitais(dataHospitais);
      setAmbulatorios(dataAmbulatorios);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os registros iniciais.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarDadosSilencioso() {
    try {
      if (abaAtiva === "hospitais") {
        const data = await fetchHospitais();
        setHospitais(data);
      } else {
        const data = await fetchAmbulatorios();
        setAmbulatorios(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Ativa a trava, muda o estado e faz o scroll limpo
  function gerenciarTrocaAba(aba: "hospitais" | "ambulatorios") {
    if (abaAtiva === aba) return;

    isProgrammaticScroll.current = true; // Liga a trava
    setAbaAtiva(aba);

    const xOffset = aba === "hospitais" ? 0 : SCREEN_WIDTH;
    slideRef.current?.scrollTo({ x: xOffset, animated: true });

    // Libera a trava logo após o término esperado da animação nativa (300ms)
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 350);
  }

  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    // Se a rolagem foi gerada pelo clique do botão, ignora o cálculo do scroll
    if (isProgrammaticScroll.current) return;

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const paginaAtual = Math.round(contentOffsetX / SCREEN_WIDTH);
    const novaAba = paginaAtual === 0 ? "hospitais" : "ambulatorios";

    if (abaAtiva !== novaAba) {
      setAbaAtiva(novaAba);
    }
  }

  async function handleDelete(id: string) {
    const nomeTipo = abaAtiva === "hospitais" ? "Hospital" : "Ambulatório";
    Alert.alert(
      `Excluir ${nomeTipo}`,
      `Deseja realmente excluir este ${nomeTipo.toLowerCase()}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              if (abaAtiva === "hospitais") {
                await fetchDeleteHospital(id);
              } else {
                // await fetchDeleteAmbulatorio(id);
              }
              atualizarDadosSilencioso();
            } catch (error) {
              console.log(error);
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          },
        },
      ],
    );
  }

  function handleEdit(item: any) {
    setItemSelecionado(item);
    setTipoCadastro(abaAtiva === "hospitais" ? "hospital" : "ambulatorio");
    setModalVisible(true);
  }

  function handleSelectTipo(tipo: "hospital" | "ambulatorio") {
    setTipoCadastro(tipo);
    setSelectionModalVisible(false);
    setModalVisible(true);
  }

  async function handleSave(dados: any) {
    try {
      if (dados.tipo === "ambulatorio") {
        await fetchCreateAmbulatorio(dados);
        Alert.alert("Sucesso", "Ambulatório salvo com sucesso!");
        setTimeout(() => gerenciarTrocaAba("ambulatorios"), 300);
      } else {
        if (itemSelecionado) {
          await fetchUpdateHospital(itemSelecionado.id, dados);
        } else {
          await fetchCreateHospital(dados);
        }
        Alert.alert("Sucesso", "Hospital salvo com sucesso!");
        setTimeout(() => gerenciarTrocaAba("hospitais"), 300);
      }

      setModalVisible(false);
      setTipoCadastro(null);
      setItemSelecionado(null);
      await atualizarDadosSilencioso();
    } catch (error) {
      console.log("Erro ao salvar registro:", error);
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
        <Text style={styles.title}>
          {abaAtiva === "hospitais" ? "🏥 Hospitais" : "🩺 Ambulatórios"}
        </Text>
        <Text style={styles.subtitle}>Gestão inteligente e centralizada</Text>

        <View style={styles.headerStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {abaAtiva === "hospitais"
                ? hospitais.length
                : ambulatorios.length}
            </Text>
            <Text style={styles.statLabel}>Registros</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Ativo</Text>
            <Text style={styles.statLabel}>Sistema</Text>
          </View>
        </View>
      </View>

      {/* SHORTCUTS - FIXOS COM INDICAÇÃO EM BORDA */}
      <View style={styles.shortcutRow}>
        {[
          {
            id: "hospitais",
            icon: "business",
            label: "Hospitais",
            color: COLORS.primary,
          },
          {
            id: "ambulatorios",
            icon: "medical",
            label: "Ambulatórios",
            color: "#2E7D32",
          },
        ].map((item) => {
          const isSelected = abaAtiva === item.id;
          return (
            <Pressable
              key={item.id}
              disabled={item.id === "medicos"}
              style={[
                styles.shortcutCard,
                isSelected && {
                  borderBottomWidth: 3,
                  borderBottomColor: item.color,
                  paddingBottom: 9,
                },
              ]}
              onPress={() => gerenciarTrocaAba(item.id as any)}
            >
              <View style={styles.iconBg}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <Text
                style={[
                  styles.shortcutText,
                  isSelected && { color: item.color, fontWeight: "700" },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* LISTA CONTAINER GLOBAL */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            {abaAtiva === "hospitais"
              ? "Hospitais Cadastrados"
              : "Ambulatórios Cadastrados"}
          </Text>
          <Text style={styles.listCounter}>
            {abaAtiva === "hospitais" ? hospitais.length : ambulatorios.length}{" "}
            total
          </Text>
        </View>

        <ScrollView
          ref={slideRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
          bounces={false}
        >
          {/* SLIDE 1: HOSPITAIS */}
          <View style={styles.pageSlide}>
            <FlatList
              data={hospitais}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <UnidadeCard
                  item={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name="medkit-outline"
                    size={48}
                    color={COLORS.primary}
                  />
                  <Text style={styles.emptyTitle}>
                    Nenhum hospital encontrado
                  </Text>
                </View>
              }
            />
          </View>

          {/* SLIDE 2: AMBULATÓRIOS */}
          <View style={styles.pageSlide}>
            <FlatList
              data={ambulatorios}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <UnidadeCard
                  item={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="medical-outline" size={48} color="#2E7D32" />
                  <Text style={styles.emptyTitle}>
                    Nenhum ambulatório encontrado
                  </Text>
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>

      {/* FAB */}
      <Pressable
        style={styles.fab}
        onPress={() => {
          setItemSelecionado(null);
          setSelectionModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </Pressable>

      {/* MODAL DE ESCOLHA */}
      <Modal visible={selectionModalVisible} transparent animationType="fade">
        <View style={styles.selectionOverlay}>
          <View style={styles.selectionCard}>
            <Text style={styles.selectionTitle}>O que deseja cadastrar?</Text>
            <TouchableOpacity
              style={styles.typeButtonHospital}
              onPress={() => handleSelectTipo("hospital")}
            >
              <Text style={styles.typeButtonText}>Novo Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.typeButton}
              onPress={() => handleSelectTipo("ambulatorio")}
            >
              <Text style={styles.typeButtonText}>Novo Ambulatório</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeSelectionButton}
              onPress={() => setSelectionModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FORMULÁRIO */}
      <HospitalForm
        visible={modalVisible}
        tipo={tipoCadastro}
        hospital={itemSelecionado}
        hospitaisDisponiveis={hospitais}
        onClose={() => {
          setModalVisible(false);
          setTipoCadastro(null);
          setItemSelecionado(null);
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
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: COLORS.primary,
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: "700", color: "#FFF" },
  subtitle: { fontSize: 14, color: "#E5E7EB", marginTop: 4 },
  headerStats: { flexDirection: "row", marginTop: 16, gap: 12 },
  statBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 12,
  },
  statNumber: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  statLabel: { color: "#E5E7EB", fontSize: 12 },
  shortcutRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  shortcutCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 4,
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    backgroundColor: "#F3F4F6",
  },
  shortcutText: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  listTitle: { fontSize: 15, fontWeight: "700" },
  listCounter: { fontSize: 12, color: "#6B7280" },
  pageSlide: { width: SCREEN_WIDTH - 32, paddingHorizontal: 14 },
  listContent: { paddingBottom: 120 },
  emptyContainer: { alignItems: "center", paddingVertical: 40, gap: 8 },
  emptyTitle: { fontSize: 14, fontWeight: "700" },
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
  selectionOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  selectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    elevation: 5,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F2937",
  },
  typeButton: {
    backgroundColor: "#3CB371",
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  typeButtonHospital: {
    backgroundColor: "#4499b8",
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  typeButtonText: { fontSize: 16, fontWeight: "600", color: "#e6e6e6" },
  closeSelectionButton: { marginTop: 8, padding: 10 },
  cancelText: { color: "#EF4444", fontWeight: "600", fontSize: 15 },
});