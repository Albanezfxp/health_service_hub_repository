import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import MedicoCard from "@/components/Medicos/MedicoCard";
import MedicoForm from "@/components/Medicos/MedicoForm";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MedicoScreen() {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState<"efetivos" | "residentes">(
    "efetivos",
  );

  const slideRef = useRef<ScrollView>(null);
  const isProgrammaticScroll = useRef(false);

  // Estados dos Modais
  const [selectionModalVisible, setSelectionModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState<
    "EFETIVO" | "RESIDENTE" | null
  >(null);
  const [itemSelecionado, setItemSelecionado] = useState<any | null>(null);

  useEffect(() => {
    carregarMedicos();
  }, []);

  async function carregarMedicos() {
    try {
      setLoading(true);
      // Simulação de fetch da API (Substituir pelo seu service real)
      // const data = await getMedicos();
      // setMedicos(data);
      setMedicos([]); // Começa vazio
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os médicos.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarDadosSilencioso() {
    try {
      // const data = await getMedicos();
      // setMedicos(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Separa as listas para os slides baseados no Enum TipoMedico do seu Prisma
  const efetivos = medicos.filter((m) => m.tipo === "EFETIVO");
  const residentes = medicos.filter((m) => m.tipo === "RESIDENTE");

  function gerenciarTrocaAba(aba: "efetivos" | "residentes") {
    if (abaAtiva === aba) return;
    isProgrammaticScroll.current = true;
    setAbaAtiva(aba);
    const xOffset = aba === "efetivos" ? 0 : SCREEN_WIDTH;
    slideRef.current?.scrollTo({ x: xOffset, animated: true });
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 350);
  }

  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (isProgrammaticScroll.current) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const paginaAtual = Math.round(contentOffsetX / SCREEN_WIDTH);
    const novaAba = paginaAtual === 0 ? "efetivos" : "residentes";
    if (abaAtiva !== novaAba) {
      setAbaAtiva(novaAba);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert(
      "Excluir Médico",
      "Deseja realmente remover este profissional do sistema?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              // await deleteMedico(id);
              Alert.alert("Sucesso", "Médico removido com sucesso!");
              atualizarDadosSilencioso();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          },
        },
      ],
    );
  }

  function handleEdit(item: any) {
    setItemSelecionado(item);
    setTipoCadastro(item.tipo);
    setModalVisible(true);
  }

  function handleSelectTipo(tipo: "EFETIVO" | "RESIDENTE") {
    setTipoCadastro(tipo);
    setSelectionModalVisible(false);
    setModalVisible(true);
  }

  async function handleSave(dados: any) {
    try {
      if (itemSelecionado) {
        // await updateMedico(itemSelecionado.id, dados);
        Alert.alert("Sucesso", "Cadastro médico atualizado!");
      } else {
        // await createMedico(dados);
        Alert.alert("Sucesso", "Novo médico cadastrado!");
      }
      setModalVisible(false);
      setTipoCadastro(null);
      setItemSelecionado(null);
      await atualizarDadosSilencioso();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o médico.");
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
        <Text style={styles.title}>👨‍⚕️ Corpo Médico</Text>
        <Text style={styles.subtitle}>Gestão de especialidades e plantões</Text>

        <View style={styles.headerStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{medicos.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{efetivos.length}</Text>
            <Text style={styles.statLabel}>Efetivos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{residentes.length}</Text>
            <Text style={styles.statLabel}>Residentes</Text>
          </View>
        </View>
      </View>

      {/* SHORTCUTS / TABS (Fundo fixo sem animação bizarra) */}
      <View style={styles.shortcutRow}>
        {[
          {
            id: "efetivos",
            icon: "shield-checkmark",
            label: "Efetivos",
            color: COLORS.primary,
          },
          {
            id: "residentes",
            icon: "school",
            label: "Residentes",
            color: "#1565C0",
          },
        ].map((item) => {
          const isSelected = abaAtiva === item.id;
          return (
            <Pressable
              key={item.id}
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

      {/* COMPONENTE DE LISTAGEM DE SLIDES HORIZONTAIS */}
      <View style={styles.listContainer}>
        <ScrollView
          ref={slideRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
          bounces={false}
        >
          {/* SLIDE 1: EFETIVOS */}
          <View style={styles.pageSlide}>
            <FlatList
              data={efetivos}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <MedicoCard
                  item={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name="people-outline"
                    size={48}
                    color={COLORS.primary}
                  />
                  <Text style={styles.emptyTitle}>
                    Nenhum médico efetivo encontrado
                  </Text>
                </View>
              }
            />
          </View>

          {/* SLIDE 2: RESIDENTES */}
          <View style={styles.pageSlide}>
            <FlatList
              data={residentes}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <MedicoCard
                  item={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="book-outline" size={48} color="#1565C0" />
                  <Text style={styles.emptyTitle}>
                    Nenhum residente encontrado
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

      {/* POP-UP DE ESCOLA DO SUBTIPO */}
      <Modal visible={selectionModalVisible} transparent animationType="fade">
        <View style={styles.selectionOverlay}>
          <View style={styles.selectionCard}>
            <Text style={styles.selectionTitle}>
              Selecione o vínculo do Médico
            </Text>
            <TouchableOpacity
              style={styles.typeButtonEfetivo}
              onPress={() => handleSelectTipo("EFETIVO")}
            >
              <Text style={styles.typeButtonText}>📋 Médico Efetivo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.typeButtonResidente}
              onPress={() => handleSelectTipo("RESIDENTE")}
            >
              <Text style={styles.typeButtonText}>🎓 Médico Residente</Text>
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

      {/* FORMULÁRIO COMPLETO */}
      <MedicoForm
        visible={modalVisible}
        tipo={tipoCadastro}
        medico={itemSelecionado}
        supervisoresDisponiveis={efetivos} // Só médicos efetivos podem supervisionar
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
    padding: 10,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  statNumber: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  statLabel: { color: "#E5E7EB", fontSize: 11 },
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
  pageSlide: { width: SCREEN_WIDTH - 32, paddingHorizontal: 14 },
  listContent: { paddingBottom: 120 },
  emptyContainer: { alignItems: "center", paddingVertical: 40, gap: 8 },
  emptyTitle: { fontSize: 14, fontWeight: "700", color: "#6B7280" },
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
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1F2937",
  },
  typeButtonEfetivo: {
    backgroundColor: COLORS.primary,
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  typeButtonResidente: {
    backgroundColor: "#1565C0",
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  typeButtonText: { fontSize: 16, fontWeight: "600", color: "#FFF" },
  closeSelectionButton: { marginTop: 8, padding: 10 },
  cancelText: { color: "#EF4444", fontWeight: "600", fontSize: 15 },
});
