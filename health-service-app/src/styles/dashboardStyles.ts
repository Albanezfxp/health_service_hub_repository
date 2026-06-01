// src/styles/dashboardStyles.ts

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    padding: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
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
  },

  statCard: {
    width: "47%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
    color: "#111827",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
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

  /* QUICK ACTIONS */
  quickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  quickBtn: {
    alignItems: "center",
    width: "22%",
  },

  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    elevation: 4,
  },

  quickText: {
    fontSize: 12,
    color: "#374151",
  },

  /* ACTIVITIES */
  activityContainer: {
    marginTop: 8,
  },

  activityItem: {
    flexDirection: "row",
    marginBottom: 16,
  },

  timeline: {
    alignItems: "center",
    marginRight: 12,
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
    marginTop: 2,
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
});
