import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { Hospital } from "@/types/interfaces/Hospital";

interface HospitalCardProps {
  hospital: Hospital;

  onEdit?: (hospital: Hospital) => void;

  onDelete?: (id: string) => void;
}

export default function HospitalCard({
  hospital,
  onEdit,
  onDelete,
}: HospitalCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>

        <View style={styles.iconContainer}>
          <Ionicons
            name="business"
            size={24}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nome}>
            {hospital.nome}
          </Text>

          <Text style={styles.endereco}>
            📍 {hospital.endereco}
          </Text>

          <Text style={styles.capacidade}>
            🏥 {hospital.capacidade || 0} leitos
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            onEdit?.(hospital)
          }
        >
          <Ionicons
            name="create-outline"
            size={18}
            color="#FFF"
          />

          <Text style={styles.buttonText}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            onDelete?.(hospital.id)
          }
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color="#FFF"
          />

          <Text style={styles.buttonText}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,

    borderRadius: 16,

    padding: 18,

    marginBottom: 14,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 4,

    borderLeftWidth: 5,

    borderLeftColor: COLORS.primary,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",
  },

  iconContainer: {
    width: 50,

    height: 50,

    borderRadius: 12,

    backgroundColor: "#E6F4F8",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 14,
  },

  infoContainer: {
    flex: 1,
  },

  nome: {
    fontSize: 18,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 4,
  },

  endereco: {
    fontSize: 14,

    color: COLORS.textSecondary,

    marginBottom: 4,
  },

  capacidade: {
    fontSize: 14,

    color: COLORS.secondary,

    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",

    marginTop: 16,

    gap: 10,
  },

  editButton: {
    flex: 1,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: COLORS.primary,

    borderRadius: 10,

    paddingVertical: 12,

    gap: 6,
  },

  deleteButton: {
    flex: 1,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#EF4444",

    borderRadius: 10,

    paddingVertical: 12,

    gap: 6,
  },

  buttonText: {
    color: "#FFF",

    fontWeight: "600",

    fontSize: 14,
  },
});