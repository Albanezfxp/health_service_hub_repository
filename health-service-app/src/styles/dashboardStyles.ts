import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F9",
  },

  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
    color: "#111827",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },

  quickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  quickBtn: {
    alignItems: "center",
    flex: 1,
  },

  quickIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  quickText: {
    fontSize: 12,
    color: "#374151",
  },

  activityContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  activityItem: {
    flexDirection: "row",
    marginBottom: 16,
  },

  timeline: {
    alignItems: "center",
    marginRight: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6366F1",
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 4,
  },

  activityContent: {
    flex: 1,
  },

  activityText: {
    fontSize: 14,
    color: "#111827",
  },

  activityTime: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  resetBtn: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 40,
  },

  resetText: {
    color: "#FFF",
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.7,
  },
});
