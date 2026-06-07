import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  item: any;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}

export default function RequisicaoEquipamentoCard({
  item,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color="#2A7F9E"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.numero}>
            {item.numeroRequisicao}
          </Text>

          <Text style={styles.info}>
            📦 Quantidade: {item.quantidade}
          </Text>

          <Text style={styles.info}>
            📋 Status: {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit?.(item)}
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
          onPress={() => onDelete?.(item.id)}
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
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#2A7F9E",
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

  numero: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },

  info: {
    color: "#6B7280",
    marginBottom: 3,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
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
  },
});