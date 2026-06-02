import { View, Text } from "react-native";
import styles from "../../styles/dashboardStyles";

type Activity = {
  id: string;
  text: string;
  time: string;
};

type Props = {
  item: Activity;
  isLast: boolean;
};

export function ActivityItem({ item, isLast }: Props) {
  return (
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
}
