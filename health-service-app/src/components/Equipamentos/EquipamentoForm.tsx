import { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

interface EquipamentoFormProps {
  visible: boolean;
  equipamento?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EquipamentoForm({
  visible,
  equipamento,
  onClose,
  onSave,
}: EquipamentoFormProps) {
  const [nome, setNome] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [cor, setCor] = useState("");

  useEffect(() => {
    if (equipamento) {
      setNome(equipamento.nome || "");
      setFabricante(equipamento.fabricante || "");
      setCor(equipamento.cor || "");
    } else {
      setNome("");
      setFabricante("");
      setCor("");
    }
  }, [equipamento, visible]);

  const handleSave = () => {
    onSave({
      nome,
      fabricante,
      cor,
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {equipamento ? "Editar Equipamento" : "Novo Equipamento"}
        </Text>

        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do equipamento"
        />

        <Text style={styles.label}>Fabricante</Text>
        <TextInput
          style={styles.input}
          value={fabricante}
          onChangeText={setFabricante}
          placeholder="Fabricante"
        />

        <Text style={styles.label}>Cor</Text>
        <TextInput
          style={styles.input}
          value={cor}
          onChangeText={setCor}
          placeholder="Cor"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F8FAFC",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
  },
  saveButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 24,
  },
  saveButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: "center",
    fontWeight: "700",
  },
});