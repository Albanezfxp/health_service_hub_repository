import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/dashboardStyles";

export const QuickAction = ({ action, onPress }: any) => (
  <TouchableOpacity style={styles.quickBtn} onPress={onPress}>
    <View style={[styles.quickIcon, { backgroundColor: action.color }]}>
      <Ionicons name={action.icon} size={20} color="#FFF" />
    </View>
    <Text style={styles.quickText}>{action.label}</Text>
  </TouchableOpacity>
);
