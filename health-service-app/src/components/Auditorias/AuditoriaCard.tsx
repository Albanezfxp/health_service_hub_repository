import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AuditoriaCardProps {
  item: any;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}

export default function AuditoriaCard({
  item,
  onEdit,
  onDelete,
}: AuditoriaCardProps) {
  const dataFormatada = item.dataAuditoria
    ? new Date(item.dataAuditoria).toLocaleDateString("pt-BR")
    : "-";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="clipboard-outline"
            size={24}
            color="#424242"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>Auditoria</Text>

          <Text style={styles.info}>
            📅 {dataFormatada}
          </Text>

          <Text style={styles.info}>
            🏥 {item.ambulatorioId || "Não informado"}
          </Text>

          <Text style={styles.info}>
            👨‍⚕️ {item.medicoResponsavelId || "Não informado"}
          </Text>

          {item.observacoes ? (
            <Text style={styles.info}>
              📝 {item.observacoes}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#424242",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text || "#1F2937",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary || "#4B5563",
    marginBottom: 4,
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