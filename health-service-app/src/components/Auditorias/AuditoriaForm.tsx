import {
    fetchAmbulatorios,
    fetchMedicosEfetivos,
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
  auditoria?: any;
  onClose: () => void;
  onSave: (dados: any) => void;
}

export default function AuditoriaForm({
  visible,
  auditoria,
  onClose,
  onSave,
}: Props) {
  const [dataAuditoria, setDataAuditoria] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [ambulatorioId, setAmbulatorioId] = useState("");
  const [medicoResponsavelId, setMedicoResponsavelId] =
    useState("");

  const [ambulatorios, setAmbulatorios] = useState<any[]>([]);
  const [medicosEfetivos, setMedicosEfetivos] = useState<any[]>(
    [],
  );

  useEffect(() => {
    if (visible) {
      carregarDados();
    }
  }, [visible]);

  useEffect(() => {
    if (auditoria) {
      setDataAuditoria(
        auditoria.dataAuditoria
          ?.toString()
          ?.substring(0, 10) || "",
      );

      setObservacoes(auditoria.observacoes || "");

      setAmbulatorioId(
        auditoria.ambulatorioId || "",
      );

      setMedicoResponsavelId(
        auditoria.medicoResponsavelId || "",
      );
    } else {
      limparCampos();
    }
  }, [auditoria]);

  async function carregarDados() {
  try {
    console.log("BUSCANDO AMBULATORIOS...");
    const ambs = await fetchAmbulatorios();
    console.log("AMBULATORIOS OK", ambs);

    console.log("BUSCANDO MEDICOS EFETIVOS...");
    const meds = await fetchMedicosEfetivos();
    console.log("MEDICOS OK", meds);

    setAmbulatorios(ambs || []);
    setMedicosEfetivos(meds || []);
  } catch (error: any) {
    console.log(
      "ERRO RESPONSE:",
      error?.response?.data,
    );

    console.log(
      "ERRO STATUS:",
      error?.response?.status,
    );

    console.log("ERRO COMPLETO:", error);
  }
}

  function limparCampos() {
    setDataAuditoria("");
    setObservacoes("");
    setAmbulatorioId("");
    setMedicoResponsavelId("");
  }

  function salvar() {
  console.log({
    dataAuditoria,
    observacoes,
    ambulatorioId,
    medicoResponsavelId,
  });

  onSave({
    dataAuditoria,
    observacoes,
    ambulatorioId,
    medicoResponsavelId,
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
              {auditoria
                ? "Editar Auditoria"
                : "Nova Auditoria"}
            </Text>

            <Text style={styles.label}>
              Data da Auditoria
            </Text>

            <TextInput
                style={styles.input}
                value={dataAuditoria}
                onChangeText={setDataAuditoria}
                placeholder="AAAA-MM-DD"
/>

            <Text style={styles.label}>
              Ambulatório
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
  selectedValue={ambulatorioId}
  itemStyle={{
    color: "#000",
    fontSize: 18,
  }}
  onValueChange={(value) =>
    setAmbulatorioId(value)
  }
>
                <Picker.Item
                  label="Selecione um ambulatório"
                  value=""
                />

                {ambulatorios.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.nome}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>
              Médico Responsável
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
  selectedValue={medicoResponsavelId}
  itemStyle={{
    color: "#000",
    fontSize: 18,
  }}
  onValueChange={(value) =>
    setMedicoResponsavelId(value)
  }
>
                <Picker.Item
                  label="Selecione um médico"
                  value=""
                />

                {medicosEfetivos.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.id}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>
              Observações
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  height: 100,
                  textAlignVertical: "top",
                },
              ]}
              multiline
              value={observacoes}
              onChangeText={setObservacoes}
            />

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={salvar}
              >
                <Text style={styles.buttonText}>
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
    backgroundColor: "rgba(0,0,0,.5)",
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
     height: 50,
     justifyContent: "center",
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