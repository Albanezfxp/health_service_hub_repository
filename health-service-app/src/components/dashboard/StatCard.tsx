import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/dashboardStyles";

type StatItem = {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
};

type Props = {
  item: StatItem;
};

export function StatCard({ item }: Props) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={item.icon} size={22} color="#6366F1" />
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );
}
