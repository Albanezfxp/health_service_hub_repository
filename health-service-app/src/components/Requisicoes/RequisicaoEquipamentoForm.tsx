import {
    fetchAuditorias,
    fetchEquipamentos,
} from "@/services/api";
import { COLORS } from "@/theme/colors";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  visible: boolean;
  requisicao?: any;
  onClose: () => void;
  onSave: (dados: any) => void;
}

export default function RequisicaoEquipamentoForm({
  visible,
  requisicao,
  onClose,
  onSave,
}: Props) {
  const [numeroRequisicao, setNumeroRequisicao] =
    useState("");

  const [dataRequisicao, setDataRequisicao] =
    useState("");

  const [quantidade, setQuantidade] =
    useState("");

  const [auditoriaId, setAuditoriaId] =
    useState("");

  const [equipamentoId, setEquipamentoId] =
    useState("");

  const [auditorias, setAuditorias] =
    useState<any[]>([]);

  const [equipamentos, setEquipamentos] =
    useState<any[]>([]);

  useEffect(() => {
    if (visible) {
      carregarDados();
    }
  }, [visible]);

  useEffect(() => {
    if (requisicao) {
      setNumeroRequisicao(
        requisicao.numeroRequisicao || "",
      );

      setDataRequisicao(
        requisicao.dataRequisicao
          ?.toString()
          ?.substring(0, 10) || "",
      );

      setQuantidade(
        String(requisicao.quantidade || ""),
      );

      setAuditoriaId(
        requisicao.auditoriaId || "",
      );

      setEquipamentoId(
        requisicao.equipamentoId || "",
      );
    } else {
      limparCampos();
    }
  }, [requisicao]);

  async function carregarDados() {
    try {
      const [auds, equips] =
        await Promise.all([
          fetchAuditorias(),
          fetchEquipamentos(),
        ]);

      setAuditorias(auds);
      setEquipamentos(equips);
    } catch (error) {
      console.log(error);
    }
  }

  function limparCampos() {
    setNumeroRequisicao("");
    setDataRequisicao("");
    setQuantidade("");
    setAuditoriaId("");
    setEquipamentoId("");
  }

  function salvar() {
    if (requisicao) {
      onSave({
        quantidade: Number(quantidade),
        status:
          requisicao.status || "Solicitado",
        dataEntrega:
          requisicao.dataEntrega || null,
      });

      return;
    }

    onSave({
      numeroRequisicao,
      dataRequisicao,
      quantidade: Number(quantidade),
      auditoriaId,
      equipamentoId,
    });
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>
              {requisicao
                ? "Editar Requisição"
                : "Nova Requisição"}
            </Text>

            <Text style={styles.label}>
              Número da Requisição
            </Text>

            <TextInput
              style={styles.input}
              value={numeroRequisicao}
              onChangeText={
                setNumeroRequisicao
              }
              placeholder="REQ001"
              editable={!requisicao}
            />

            <Text style={styles.label}>
              Data da Requisição
            </Text>

            <TextInput
              style={styles.input}
              value={dataRequisicao}
              onChangeText={
                setDataRequisicao
              }
              placeholder="2026-06-06"
              editable={!requisicao}
            />

            <Text style={styles.label}>
              Quantidade
            </Text>

            <TextInput
              style={styles.input}
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />

            <Text style={styles.label}>
              Auditoria
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
  selectedValue={auditoriaId}
  style={{ color: "#000" }}
  dropdownIconColor="#000"
  enabled={!requisicao}
  onValueChange={(value) =>
    setAuditoriaId(value)
  }
>
  <Picker.Item
    label="Selecione uma auditoria"
    value=""
    color="#000"
  />

  {auditorias.map((item) => (
    <Picker.Item
      key={item.id}
      label={`Auditoria ${item.id.substring(
        0,
        8,
      )}`}
      value={item.id}
      color="#000"
    />
  ))}
</Picker>
            </View>

            <Text style={styles.label}>
              Equipamento
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
  selectedValue={equipamentoId}
  style={{ color: "#000" }}
  dropdownIconColor="#000"
  enabled={!requisicao}
  onValueChange={(value) =>
    setEquipamentoId(value)
  }
>
  <Picker.Item
    label="Selecione um equipamento"
    value=""
    color="#000"
  />

  {equipamentos.map((item) => (
    <Picker.Item
      key={item.id}
      label={item.nome}
      value={item.id}
      color="#000"
    />
  ))}
</Picker>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text
                  style={styles.buttonText}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={salvar}
              >
                <Text
                  style={styles.buttonText}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,.5)",
    justifyContent: "center",
  },

  container: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 16,
    padding: 20,
    maxHeight: "85%",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: COLORS.primary,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});