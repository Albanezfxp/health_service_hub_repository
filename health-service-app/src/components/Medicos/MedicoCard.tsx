import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";

interface MedicoCardProps {
  item: any;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}

export default function MedicoCard({
  item,
  onEdit,
  onDelete,
}: MedicoCardProps) {
  const isEfetivo = item.tipo === "EFETIVO";

  return (
    <View style={[styles.card, !isEfetivo && styles.cardResidente]}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            !isEfetivo && styles.iconContainerResidente,
          ]}
        >
          <Ionicons
            name={isEfetivo ? "shield-checkmark" : "school"}
            size={24}
            color={isEfetivo ? COLORS.primary : "#1565C0"}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.info}>
            🪪 Matrícula: {item.matricula}{" "}
            {item.carteira?.crm ? `| CRM: ${item.carteira.crm}` : ""}
          </Text>
          <Text style={styles.info}>
            ✉️ {item.email} {item.telefone ? `| 📞 ${item.telefone}` : ""}
          </Text>

          {/* Local de Lotação Vinculado */}
          <Text style={styles.lotacaoTag}>
            🏢 Lotação:{" "}
            {item.lotacoes?.[0]?.ambulatorio?.nome || "Sem lotação ativa"}
          </Text>

          {isEfetivo ? (
            <Text style={styles.detalhe}>
              👔 Supervisor: {item.supervisor?.nome || "Diretoria Geral"}
            </Text>
          ) : (
            <Text style={[styles.detalhe, { color: "#1565C0" }]}>
              💰 Bolsa: R$ {Number(item.bolsa || 0).toFixed(2)} (
              {item.orgaoPagador || "MS"})
            </Text>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.editButton,
            !isEfetivo && { backgroundColor: "#1565C0" },
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
  },
  cardResidente: { borderLeftColor: "#1565C0" },
  header: { flexDirection: "row", alignItems: "center" },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#E6F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconContainerResidente: { backgroundColor: "#E3F2FD" },
  infoContainer: { flex: 1 },
  nome: { fontSize: 17, fontWeight: "700", color: "#1F2937", marginBottom: 4 },
  info: { fontSize: 13, color: "#4B5563", marginBottom: 2 },
  lotacaoTag: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
    marginTop: 2,
  },
  detalhe: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: 4,
  },
  actions: { flexDirection: "row", marginTop: 14, gap: 10 },
  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  buttonText: { color: "#FFF", fontWeight: "600", fontSize: 14 },
});
