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
import { Hospital } from "@/types/interfaces/Hospital";

interface HospitalFormProps {
  visible: boolean;
  tipo: "hospital" | "ambulatorio" | null;
  hospital?: Hospital | null;
  hospitaisDisponiveis: Hospital[]; // RECEBE A LISTA DE HOSPITAIS CADASTRADOS
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function HospitalForm({
  visible,
  tipo,
  hospital,
  hospitaisDisponiveis,
  onClose,
  onSave,
}: HospitalFormProps) {
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [sigla, setSigla] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  const [idHospitalVinculado, setIdHospitalVinculado] = useState("");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    if (hospital) {
      setNome(hospital.nome);
      setEndereco(hospital.endereco || "");
      setCapacidade(hospital.capacidade?.toString() || "");
      setIdHospitalVinculado(hospital.id || "");
    } else {
      limparCampos();
    }
  }, [hospital, visible]);

  function limparCampos() {
    setNome("");
    setEndereco("");
    setCapacidade("");
    setSigla("");
    setRua("");
    setBairro("");
    setNumero("");
    setCidade("");
    setEstado("");
    setCep("");
    setIdHospitalVinculado("");
  }

  function handleSalvar() {
    if (!nome.trim()) {
      return Alert.alert("Aviso", "O campo Nome é obrigatório.");
    }

    if (tipo === "ambulatorio") {
      if (!idHospitalVinculado) {
        return Alert.alert(
          "Aviso",
          "Por favor, selecione um Hospital para vincular este ambulatório.",
        );
      }
      if (!rua || !bairro || !numero || !cidade || !estado || !cep) {
        return Alert.alert(
          "Aviso",
          "Por favor, preencha todos os campos do endereço do ambulatório.",
        );
      }

      onSave({
        tipo: "ambulatorio",
        nome,
        sigla: sigla || undefined,
        rua,
        bairro,
        numero,
        cidade,
        estado,
        cep,
        idHospital: idHospitalVinculado,
      });
    } else {
      onSave({
        tipo: "hospital",
        nome,
        endereco,
        capacidade: capacidade ? Number(capacidade) : undefined,
      });
    }
    limparCampos();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          {/* HEADER DO FORMULÁRIO */}
          <View style={styles.formHeader}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={tipo === "hospital" ? "business" : "medical"}
                size={24}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.title}>
              {hospital
                ? `Editar ${tipo === "hospital" ? "Hospital" : "Ambulatório"}`
                : `Novo ${tipo === "hospital" ? "Hospital" : "Ambulatório"}`}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* INPUT: NOME */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Unidade</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "nome" && styles.inputFocused,
                ]}
                placeholder="Ex: Ambulatório de Traumatologia"
                placeholderTextColor="#9CA3AF"
                value={nome}
                onChangeText={setNome}
                onFocus={() => setFocusedInput("nome")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* CAMPOS ESPECÍFICOS DE HOSPITAL */}
            {tipo === "hospital" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Endereço Completo</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "endereco" && styles.inputFocused,
                    ]}
                    placeholder="Ex: Av. Governador Flávio Ribeiro Coutinho, 500"
                    placeholderTextColor="#9CA3AF"
                    value={endereco}
                    onChangeText={setEndereco}
                    onFocus={() => setFocusedInput("endereco")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Capacidade de Leitos</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "capacidade" && styles.inputFocused,
                    ]}
                    placeholder="Ex: 150"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={capacidade}
                    onChangeText={setCapacidade}
                    onFocus={() => setFocusedInput("capacidade")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </>
            )}

            {/* CAMPOS ESPECÍFICOS DE AMBULATÓRIO */}
            {tipo === "ambulatorio" && (
              <>
                {/* CAMPO DE VINCULAÇÃO CORRIGIDO COM SCROLLVIEW */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Selecione o Hospital Vinculado
                  </Text>
                  {hospitaisDisponiveis.length === 0 ? (
                    <Text style={styles.warningText}>
                      Nenhum hospital cadastrado para vincular.
                    </Text>
                  ) : (
                    /* CORREÇÃO: ScrollView com nestedScrollEnabled ativa a rolagem interna segura */
                    <ScrollView
                      style={styles.selectorContainer}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                    >
                      {hospitaisDisponiveis.map((item) => {
                        const isSelected = idHospitalVinculado === item.id;
                        return (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.selectorItem,
                              isSelected && styles.selectorItemActive,
                            ]}
                            onPress={() => setIdHospitalVinculado(item.id)}
                            activeOpacity={0.7}
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
                                isSelected && styles.selectorItemTextActive,
                              ]}
                              numberOfLines={1}
                            >
                              {item.nome}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Sigla do Ambulatório</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "sigla" && styles.inputFocused,
                    ]}
                    placeholder="Ex: AMB-01"
                    placeholderTextColor="#9CA3AF"
                    value={sigla}
                    onChangeText={setSigla}
                    maxLength={10}
                    autoCapitalize="characters"
                    onFocus={() => setFocusedInput("sigla")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Rua / Logradouro</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "rua" && styles.inputFocused,
                    ]}
                    placeholder="Ex: Rua Juarez Távora"
                    placeholderTextColor="#9CA3AF"
                    value={rua}
                    onChangeText={setRua}
                    onFocus={() => setFocusedInput("rua")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                <View style={styles.row}>
                  <View
                    style={[styles.inputGroup, { flex: 2, marginRight: 10 }]}
                  >
                    <Text style={styles.label}>Bairro</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "bairro" && styles.inputFocused,
                      ]}
                      placeholder="Ex: Intermares"
                      placeholderTextColor="#9CA3AF"
                      value={bairro}
                      onChangeText={setBairro}
                      onFocus={() => setFocusedInput("bairro")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Número</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "numero" && styles.inputFocused,
                      ]}
                      placeholder="Ex: 12A"
                      placeholderTextColor="#9CA3AF"
                      value={numero}
                      onChangeText={setNumero}
                      onFocus={() => setFocusedInput("numero")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "cidade" && styles.inputFocused,
                    ]}
                    placeholder="Ex: Cabedelo"
                    placeholderTextColor="#9CA3AF"
                    value={cidade}
                    onChangeText={setCidade}
                    onFocus={() => setFocusedInput("cidade")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                <View style={styles.row}>
                  <View
                    style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}
                  >
                    <Text style={styles.label}>UF</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "estado" && styles.inputFocused,
                      ]}
                      placeholder="PB"
                      placeholderTextColor="#9CA3AF"
                      value={estado}
                      onChangeText={setEstado}
                      maxLength={2}
                      autoCapitalize="characters"
                      onFocus={() => setFocusedInput("estado")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 2 }]}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "cep" && styles.inputFocused,
                      ]}
                      placeholder="Ex: 58102000"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      value={cep}
                      onChangeText={setCep}
                      maxLength={8}
                      onFocus={() => setFocusedInput("cep")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          {/* FOOTER - BOTÕES DE AÇÃO */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
              <Text style={styles.saveButtonText}>Salvar Unidade</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  iconContainer: {
    backgroundColor: "#F0FDF4",
    padding: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 6,
    paddingLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // ESTILOS DO SELETOR DE HOSPITAIS (Ajustado para ScrollView)
  selectorContainer: {
    maxHeight: 140, // Altura confortável para exibir ~2.5 itens indicando rolagem
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    padding: 6,
  },
  selectorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    gap: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  selectorItemActive: {
    backgroundColor: "#F0F9FF",
    borderColor: COLORS.primary,
  },
  selectorItemText: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
  },
  selectorItemTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  warningText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    marginTop: 12,
    gap: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 15,
  },
});
