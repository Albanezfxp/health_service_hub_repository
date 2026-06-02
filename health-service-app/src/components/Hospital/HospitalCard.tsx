import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";

interface UnidadeCardProps {
  item: any;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}

export default function HospitalCard({
  item,
  onEdit,
  onDelete,
}: UnidadeCardProps) {
  // Identifica dinamicamente se o registro atual é um ambulatório
  const isAmbulatorio = !!item.idHospital || !!item.sigla;

  // Monta a string de endereço combinada se for ambulatório
  const enderecoExibido = isAmbulatorio
    ? `${item.rua}, ${item.numero || ""} - ${item.bairro || ""}, ${item.cidade}/${item.estado}`
    : item.endereco;

  return (
    <View style={[styles.card, isAmbulatorio && styles.cardAmbulatorio]}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            isAmbulatorio && styles.iconContainerAmbulatorio,
          ]}
        >
          <Ionicons
            name={isAmbulatorio ? "medical" : "business"}
            size={24}
            color={isAmbulatorio ? "#2E7D32" : COLORS.primary}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nome}>
            {item.nome} {item.sigla ? `(${item.sigla})` : ""}
          </Text>

          <Text style={styles.endereco}>📍 {enderecoExibido}</Text>

          <Text
            style={[
              styles.capacidade,
              isAmbulatorio && styles.capacidadeAmbulatorio,
            ]}
          >
            {/* CORRIGIDO: O uso de ?. evita quebras caso o objeto hospital venha null */}
            {isAmbulatorio
              ? `🏢 ${item.hospital?.nome || "Hospital não vinculado"}`
              : `🏥 ${item.capacidade || 0} leitos`}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.editButton,
            isAmbulatorio && styles.editButtonAmbulatorio,
          ]}
          onPress={() => onEdit?.(item)}
        >
          <Ionicons name="create-outline" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete?.(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        {!isAmbulatorio && (
          <TouchableOpacity
            style={styles.seeMedics}
            onPress={() => alert("Mapeamento de médicos em desenvolvimento.")}
          >
            <Ionicons name="people" size={18} color="#FFF" />
            <Text style={styles.buttonText}>Médicos</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface || "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
  },
  cardAmbulatorio: {
    borderLeftColor: "#2E7D32",
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
  iconContainerAmbulatorio: {
    backgroundColor: "#E8F5E9",
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text || "#1F2937",
    marginBottom: 4,
  },
  endereco: {
    fontSize: 14,
    color: COLORS.textSecondary || "#4B5563",
    marginBottom: 4,
  },
  capacidade: {
    fontSize: 14,
    color: COLORS.secondary || "#007AFF",
    fontWeight: "600",
  },
  capacidadeAmbulatorio: {
    color: "#2E7D32",
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
  editButtonAmbulatorio: {
    backgroundColor: "#2E7D32",
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
  seeMedics: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c7dbe",
    borderRadius: 10,
    gap: 6,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
