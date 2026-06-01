import { View, Text } from "react-native";
import styles from "../../styles/dashboardStyles";

export const ActivityItem = ({ item, isLast }: any) => (
  <View style={styles.activityItem}>
    <View style={styles.timeline}>
      <View style={styles.dot} />
      {!isLast && <View style={styles.line} />}
    </View>

    <View style={styles.activityContent}>
      <Text style={styles.activityText}>{item.text}</Text>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  </View>
);
