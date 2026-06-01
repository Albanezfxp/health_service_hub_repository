import React, { useEffect, useState } from "react";

import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS } from "@/theme/colors";
import { Hospital } from "@/types/interfaces/Hospital";

interface HospitalFormProps {
  visible: boolean;

  hospital?: Hospital | null;

  onClose: () => void;

  onSave: (data: {
    nome: string;
    endereco: string;
    capacidade?: number;
  }) => void;
}

export default function HospitalForm({
  visible,
  hospital,
  onClose,
  onSave,
}: HospitalFormProps) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [capacidade, setCapacidade] = useState("");

  useEffect(() => {
    if (hospital) {
      setNome(hospital.nome);
      setEndereco(hospital.endereco);
      setCapacidade(
        hospital.capacidade?.toString() || ""
      );
    } else {
      limparCampos();
    }
  }, [hospital]);

  function limparCampos() {
    setNome("");
    setEndereco("");
    setCapacidade("");
  }

  function handleSalvar() {
    onSave({
      nome,
      endereco,
      capacidade: capacidade
        ? Number(capacidade)
        : undefined,
    });

    limparCampos();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <Text style={styles.title}>
            {hospital
              ? "Editar Hospital"
              : "Novo Hospital"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
          />

          <TextInput
            style={styles.input}
            placeholder="Capacidade"
            keyboardType="numeric"
            value={capacidade}
            onChangeText={setCapacidade}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSalvar}
          >
            <Text style={styles.buttonText}>
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              Cancelar
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.5)",

    justifyContent: "center",

    padding: 20,
  },

  modal: {
    backgroundColor: COLORS.surface,

    borderRadius: 20,

    padding: 20,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 20,
  },

  input: {
    borderWidth: 1,

    borderColor: "#E5E7EB",

    borderRadius: 12,

    padding: 14,

    marginBottom: 14,

    backgroundColor: "#FFF",
  },

  saveButton: {
    backgroundColor:
      COLORS.primary,

    padding: 15,

    borderRadius: 12,

    alignItems: "center",

    marginBottom: 10,
  },

  cancelButton: {
    backgroundColor: "#9CA3AF",

    padding: 15,

    borderRadius: 12,

    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",

    fontWeight: "600",

    fontSize: 16,
  },
});