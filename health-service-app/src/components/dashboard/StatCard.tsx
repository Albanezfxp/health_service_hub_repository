import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/dashboardStyles";

export const StatCard = ({ item }: any) => (
  <View style={styles.statCard}>
    <Ionicons name={item.icon} size={22} color="#6366F1" />
    <Text style={styles.statValue}>{item.value}</Text>
    <Text style={styles.statLabel}>{item.label}</Text>
  </View>
);
