import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

export default StyleSheet.create({
  // ── Layout base ──────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: "#F0F2F8",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F2F8",
    gap: 12,
  },

  loadingText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 28,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 4,
  },

  greeting: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 2,
    letterSpacing: 0.2,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textTransform: "capitalize",
  },

  logoutBtn: {
    marginTop: 4,
    backgroundColor: "#FEE2E2",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 13,
  },

  pressed: {
    opacity: 0.65,
  },

  // ── Erros ────────────────────────────────────────────────────────────────
  errorBanner: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },

  retryText: {
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 8,
  },

  // ── Alert banner ─────────────────────────────────────────────────────────
  alertBanner: {
    backgroundColor: "#FFFBEB",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },

  alertIcon: {
    fontSize: 22,
  },

  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
  },

  alertBody: {
    fontSize: 13,
    color: "#B45309",
    marginTop: 2,
  },

  // ── Stat grid ────────────────────────────────────────────────────────────
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: CARD_GAP,
  },

  // ── Seção genérica ───────────────────────────────────────────────────────
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.2,
  },

  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366F1",
  },

  // ── Card branco genérico ─────────────────────────────────────────────────
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 2,
  },

  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    paddingVertical: 12,
    textAlign: "center",
  },

  // ── KPI rows ─────────────────────────────────────────────────────────────
  kpiRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },

  kpiDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  kpiLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },

  kpiSub: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 1,
  },

  kpiValue: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  // ── Day bar chart ─────────────────────────────────────────────────────────
  dayBarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 10,
  },

  dayBarLabel: {
    fontSize: 12,
    color: "#6B7280",
    width: 56,
  },

  dayBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
  },

  dayBarFill: {
    height: 8,
    backgroundColor: "#6366F1",
    borderRadius: 4,
  },

  dayBarCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    width: 24,
    textAlign: "right",
  },

  // ── List rows ────────────────────────────────────────────────────────────
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },

  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  avatarText: {
    fontWeight: "800",
  },

  listInfo: {
    flex: 1,
  },

  listTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  listSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  listTag: {
    fontSize: 11,
    color: "#6366F1",
    fontWeight: "600",
    marginTop: 3,
  },

  listDate: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  // ── Ambulatórios horizontal ───────────────────────────────────────────────
  horizontalList: {
    paddingBottom: 4,
    gap: 12,
    paddingRight: 4,
  },

  ambulatorioCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    width: 160,
    borderTopWidth: 3,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  ambulatorioSigla: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 4,
  },

  ambulatorioNome: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
    lineHeight: 18,
  },

  ambulatorioCidade: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },

  // ── Legacy (mantido para StatCard compatibilidade) ───────────────────────
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },

  listContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    marginTop: 10,
  },

  listItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },

  listSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  alert: {
    color: "#EF4444",
    fontWeight: "600",
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
});
