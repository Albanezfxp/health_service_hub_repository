import MedicoCard from "@/components/Medicos/MedicoCard";
import MedicoForm from "@/components/Medicos/MedicoForm";
import {
  fetchCreateCarteiraFuncional,
  fetchCreateMedico,
  fetchCreateMedicoEfetivo,
  fetchCreateMedicoLotacao,
  fetchCreateMedicoResidente,
  fetchDeleteMedico,
  fetchMedicos,
  fetchUpdateCarteiraFuncional,
  fetchUpdateMedico,
} from "@/services/api";
import { COLORS } from "@/theme/colors";
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MedicoScreen() {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState<"efetivos" | "residentes">(
    "efetivos",
  );

  const slideRef = useRef<ScrollView>(null);
  const isProgrammaticScroll = useRef(false);

  // Estados dos Modais - CORRIGIDO: Declarado o estado de item selecionado
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
      const data = await fetchMedicos();
      setMedicos(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os médicos.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarDadosSilencioso() {
    try {
      const data = await fetchMedicos();
      setMedicos(data);
    } catch (error) {
      console.log(error);
    }
  }

  const efetivos = medicos.filter(
    (m) => m.tipo === "Efetivo" || m.tipo === "EFETIVO",
  );
  const residentes = medicos.filter(
    (m) => m.tipo === "Residente" || m.tipo === "RESIDENTE",
  );

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
              await fetchDeleteMedico(id);
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
    setTipoCadastro(
      item.tipo?.toUpperCase() === "EFETIVO" ? "EFETIVO" : "RESIDENTE",
    );
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
  await fetchUpdateMedico(itemSelecionado.id, {
    matricula: dados.matricula,
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone,
    tipo: dados.tipo,
  });

  // Atualiza a carteira funcional do médico efetivo
  if (
    dados.tipo === "Efetivo" &&
    itemSelecionado.carteira?.id
  ) {
    await fetchUpdateCarteiraFuncional(
      itemSelecionado.carteira.id,
      {
        crm: dados.crm,
        orgaoExpedidor: dados.orgaoExpedidor,
        dataExpedicao: new Date(),
        idMedico: itemSelecionado.id,
      }
    );
  }

  Alert.alert("Sucesso", "Cadastro médico atualizado!");
}
      else {
        const responseMedico = await fetchCreateMedico({
          matricula: dados.matricula,
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          tipo: dados.tipo,
        });

        const novoMedicoId = responseMedico.data.id;

        if (dados.tipo === "Residente") {
          await Promise.all([
            fetchCreateMedicoResidente({
              medicoId: novoMedicoId,
              valorBolsa: dados.bolsa ? Number(dados.bolsa) : undefined,
              orgaoPagador: dados.orgaoPagador || undefined,
              dataInicioResidencia: new Date().toISOString(),
            }),
            fetchCreateMedicoLotacao({
              medicoId: novoMedicoId,
              ambulatorioId: dados.ambulatorioId,
              dataInicio: new Date().toISOString(),
            }),
          ]);
        } else {
          await Promise.all([
            fetchCreateMedicoEfetivo({
              medicoId: novoMedicoId,
              dataAdmissao: new Date().toISOString(),
              supervisorId: dados.supervisorId || undefined,
            }),

            fetchCreateCarteiraFuncional({
              crm: dados.crm,
              orgaoExpedidor: dados.orgaoExpedidor || "CRM",
              dataExpedicao: new Date().toISOString(),
              idMedico: novoMedicoId,
            }),

              fetchCreateMedicoLotacao({
              medicoId: novoMedicoId,
              ambulatorioId: dados.ambulatorioId,
              dataInicio: new Date().toISOString(),
              }),
           ]);
        }

        Alert.alert(
          "Sucesso",
          `Médico ${dados.tipo.toLowerCase()} cadastrado e lotado com sucesso!`,
        );
        setTimeout(
          () =>
            gerenciarTrocaAba(
              dados.tipo === "Efetivo" ? "efetivos" : "residentes",
            ),
          300,
        );
      }

      setModalVisible(false);
      setTipoCadastro(null);
      setItemSelecionado(null);
      await atualizarDadosSilencioso();
    } catch (error) {
      console.log("Erro no fluxo do handleSave:");
      Alert.alert("Erro", "O preenchimento violou as regras de validação.");
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

      {/* SHORTCUTS / TABS */}
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

      {/* POP-UP DE ESCOLHA */}
      <Modal visible={selectionModalVisible} transparent animationType="fade">
        <View style={styles.selectionOverlay}>
          <View style={styles.selectionCard}>
            <Text style={styles.selectionTitle}>
              Selecione o vínculo do Médico
            </Text>
            <TouchableOpacity
              style={styles.typeButtonHospital}
              onPress={() => handleSelectTipo("EFETIVO")}
            >
              <Text style={styles.typeButtonText}>📋 Médico Efetivo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.typeButton}
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
        supervisoresDisponiveis={efetivos}
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
  typeButton: {
    backgroundColor: "#1565C0",
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  typeButtonHospital: {
    backgroundColor: COLORS.primary,
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  typeButtonText: { fontSize: 16, fontWeight: "600", color: "#FFF" },
  closeSelectionButton: { marginTop: 8, padding: 10 },
  cancelText: { color: "#EF4444", fontWeight: "600", fontSize: 15 },
});
