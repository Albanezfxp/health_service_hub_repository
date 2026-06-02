import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/dashboardStyles";

type Action = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

type Props = {
  action: Action;
  onPress: () => void;
};

export function QuickAction({ action, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.quickBtn} onPress={onPress}>
      <View style={[styles.quickIcon, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon} size={20} color="#FFF" />
      </View>
      <Text style={styles.quickText}>{action.label}</Text>
    </TouchableOpacity>
  );
}
