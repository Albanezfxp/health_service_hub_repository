import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { fetchAmbulatorio } from "@/services/api";

interface MedicoFormProps {
  visible: boolean;
  tipo: "EFETIVO" | "RESIDENTE" | null;
  medico?: any | null;
  supervisoresDisponiveis: any[];
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function MedicoForm({
  visible,
  tipo,
  medico,
  supervisoresDisponiveis,
  onClose,
  onSave,
}: MedicoFormProps) {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ambulatorios, setAmbulatorios] = useState<any[]>([]);
  const [idAmbulatorioSelecionado, setIdAmbulatorioSelecionado] = useState("");

  const [bolsa, setBolsa] = useState("");
  const [orgaoPagador, setOrgaoPagador] = useState("");

  const [crm, setCrm] = useState("");
  const [orgaoExpedidor, setOrgaoExpedidor] = useState("");
  const [supervisorId, setSupervisorId] = useState("");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      buscarAmbulatoriosDoSistema();
    }
    if (medico) {
      setMatricula(medico.matricula || "");
      setNome(medico.nome || "");
      setEmail(medico.email || "");
      setTelefone(medico.telefone || "");
      setBolsa(medico.residente?.valorBolsa?.toString() || "");
      setOrgaoPagador(medico.residente?.orgaoPagador || "");
      setSupervisorId(medico.efetivo?.idSupervisor || "");
      setCrm(medico.carteira?.crm || "");
      setOrgaoExpedidor(medico.carteira?.orgaoExpedidor || "");
      setIdAmbulatorioSelecionado(medico.lotacoes?.[0]?.idAmbulatorio || "");
    } else {
      limparCampos();
    }
  }, [medico, visible]);

  async function buscarAmbulatoriosDoSistema() {
    try {
      const data = await fetchAmbulatorio();
      setAmbulatorios(data);
    } catch (error) {
      console.log("Erro ao carregar ambulatórios no form médico:", error);
    }
  }

  function limparCampos() {
    setMatricula("");
    setNome("");
    setEmail("");
    setTelefone("");
    setBolsa("");
    setOrgaoPagador("");
    setSupervisorId("");
    setCrm("");
    setOrgaoExpedidor("");
    setIdAmbulatorioSelecionado("");
  }

  function handleSalvar() {
    if (!matricula.trim() || !nome.trim() || !email.trim()) {
      return Alert.alert("Aviso", "Preencha os campos obrigatórios (*).");
    }

    if (!idAmbulatorioSelecionado) {
      return Alert.alert(
        "Aviso",
        "Selecione um ambulatório de lotação para o médico.",
      );
    }

    const tipoFormatado = tipo === "EFETIVO" ? "Efetivo" : "Residente";

    if (tipoFormatado === "Efetivo" && !crm.trim()) {
      return Alert.alert(
        "Aviso",
        "O campo CRM é obrigatório para médicos efetivos.",
      );
    }

    const payload: any = {
      tipo: tipoFormatado,
      matricula: matricula.trim(),
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      ambulatorioId: idAmbulatorioSelecionado,
    };

    if (tipoFormatado === "Residente") {
      payload.bolsa = bolsa ? Number(bolsa) : null;
      payload.orgaoPagador = orgaoPagador.trim() || null;
    } else {
      payload.supervisorId = supervisorId || null;
      payload.crm = crm.trim();
      payload.orgaoExpedidor = orgaoExpedidor.trim() || "CRM";
      payload.carteira = {
        crm: crm.trim(),
        orgaoExpedidor: orgaoExpedidor.trim() || "CRM",
        dataExpedicao: new Date().toISOString(),
      };
    }

    onSave(payload);
    limparCampos();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          <View style={styles.formHeader}>
            <View
              style={[
                styles.iconContainer,
                tipo === "RESIDENTE" && { backgroundColor: "#E3F2FD" },
              ]}
            >
              <Ionicons
                name={tipo === "EFETIVO" ? "shield-checkmark" : "school"}
                size={24}
                color={tipo === "EFETIVO" ? COLORS.primary : "#1565C0"}
              />
            </View>
            <Text style={styles.title}>
              {medico
                ? "Editar Médico"
                : `Novo Médico ${tipo === "EFETIVO" ? "Efetivo" : "Residente"}`}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Matrícula *</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "matricula" && styles.inputFocused,
                ]}
                placeholder="Ex: MED-2026-89"
                placeholderTextColor="#9CA3AF"
                value={matricula}
                onChangeText={setMatricula}
                onFocus={() => setFocusedInput("matricula")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "nome" && styles.inputFocused,
                ]}
                placeholder="Ex: Dr. Gabriel Albanez"
                placeholderTextColor="#9CA3AF"
                value={nome}
                onChangeText={setNome}
                onFocus={() => setFocusedInput("nome")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail Institucional *</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "email" && styles.inputFocused,
                ]}
                placeholder="medico@hospital.com"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "telefone" && styles.inputFocused,
                ]}
                placeholder="Ex: 83999999999"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
                onFocus={() => setFocusedInput("telefone")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Lotação Inicial (Ambulatório) *</Text>
              <ScrollView
                style={styles.selectorContainer}
                nestedScrollEnabled={true}
              >
                {ambulatorios.map((amb) => {
                  const isSelected = idAmbulatorioSelecionado === amb.id;
                  return (
                    <TouchableOpacity
                      key={amb.id}
                      style={[
                        styles.selectorItem,
                        isSelected && styles.selectorItemActive,
                      ]}
                      onPress={() => setIdAmbulatorioSelecionado(amb.id)}
                    >
                      <Ionicons
                        name={isSelected ? "checkbox" : "square-outline"}
                        size={18}
                        color={isSelected ? "#2E7D32" : "#9CA3AF"}
                      />
                      <Text
                        style={[
                          styles.selectorItemText,
                          isSelected && {
                            fontWeight: "600",
                            color: COLORS.primary,
                          },
                        ]}
                      >
                        {amb.nome} {amb.sigla ? `(${amb.sigla})` : ""}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {tipo === "RESIDENTE" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Valor da Bolsa (R$)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "bolsa" && styles.inputFocused,
                    ]}
                    placeholder="Ex: 4500"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={bolsa}
                    onChangeText={setBolsa}
                    onFocus={() => setFocusedInput("bolsa")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Órgão Fomento/Pagador</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "orgao" && styles.inputFocused,
                    ]}
                    placeholder="Ex: CAPES"
                    placeholderTextColor="#9CA3AF"
                    value={orgaoPagador}
                    onChangeText={setOrgaoPagador}
                    onFocus={() => setFocusedInput("orgao")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </>
            )}

            {tipo === "EFETIVO" && (
              <>
                <View style={styles.row}>
                  <View
                    style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
                  >
                    <Text style={styles.label}>CRM *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "crm" && styles.inputFocused,
                      ]}
                      placeholder="12345-PB"
                      placeholderTextColor="#9CA3AF"
                      value={crm}
                      onChangeText={setCrm}
                      onFocus={() => setFocusedInput("crm")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Órgão Expedidor</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "expedidor" && styles.inputFocused,
                      ]}
                      placeholder="Ex: CRM"
                      placeholderTextColor="#9CA3AF"
                      value={orgaoExpedidor}
                      onChangeText={setOrgaoExpedidor}
                      onFocus={() => setFocusedInput("expedidor")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Selecione o Supervisor Médico
                  </Text>
                  <ScrollView
                    style={styles.selectorContainer}
                    nestedScrollEnabled={true}
                  >
                    {supervisoresDisponiveis
                      .filter((s) => s.id !== medico?.id)
                      .map((sup) => {
                        const isSelected = supervisorId === sup.id;
                        return (
                          <TouchableOpacity
                            key={sup.id}
                            style={[
                              styles.selectorItem,
                              isSelected && styles.selectorItemActive,
                            ]}
                            onPress={() =>
                              setSupervisorId(isSelected ? "" : sup.id)
                            }
                          >
                            <Ionicons
                              name={
                                isSelected
                                  ? "radio-button-on"
                                  : "radio-button-off"
                              }
                              size={18}
                              color={isSelected ? COLORS.primary : "#9CA3AF"}
                            />
                            <Text
                              style={[
                                styles.selectorItemText,
                                isSelected && {
                                  fontWeight: "600",
                                  color: COLORS.primary,
                                },
                              ]}
                            >
                              {sup.nome}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </ScrollView>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                tipo === "RESIDENTE" && { backgroundColor: "#1565C0" },
              ]}
              onPress={handleSalvar}
            >
              <Text style={styles.saveButtonText}>Salvar Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    maxHeight: "85%",
    elevation: 10,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  iconContainer: { backgroundColor: "#F0FDF4", padding: 10, borderRadius: 12 },
  title: { fontSize: 19, fontWeight: "700", color: "#1F2937" },
  scrollContent: { paddingBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#4B5563", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  selectorContainer: {
    maxHeight: 110,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    padding: 6,
    marginBottom: 4,
  },
  selectorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
    gap: 8,
    backgroundColor: "#FFF",
  },
  selectorItemActive: {
    backgroundColor: "#F0F9FF",
    borderColor: COLORS.primary,
  },
  selectorItemText: { fontSize: 14, color: "#4B5563", flex: 1 },
  footer: { marginTop: 12, gap: 10 },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  saveButtonText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  cancelButton: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: { color: "#6B7280", fontWeight: "600", fontSize: 15 },
});
