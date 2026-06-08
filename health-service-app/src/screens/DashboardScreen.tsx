import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";

import styles from "../styles/dashboardStyles";
import { StatCard } from "@/components/dashboard/StatCard";

import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  fetchAmbulatorios,
  fetchHospitais,
  fetchMedicos,
  fetchUserById,
} from "@/services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Medico = {
  id: string;
  nome: string;
  matricula: string;
  telefone?: string;
  email?: string;
  tipo?: string;
  hospitalId?: string;
  createdAt?: string;
  criadoEm?: string;
  carteira?: {
    crm: string;
    orgaoExpedidor: string;
    dataExpedicao: string;
  } | null;
};

type Hospital = {
  id: string;
  nome: string;
  endereco?: string;
  capacidade?: number | null;
  createdAt?: string;
  criadoEm?: string;
};

type Ambulatorio = {
  id: string;
  nome: string;
  sigla?: string;
  cidade?: string;
  estado?: string;
  criadoEm?: string;
};

type User = {
  id: string;
  nome: string;
};

const safeDate = (date?: string) => {
  if (!date) return 0;
  const parsed = new Date(date).getTime();
  return isNaN(parsed) ? 0 : parsed;
};

const getCreatedAt = (item: { createdAt?: string; criadoEm?: string }) =>
  item.createdAt ?? item.criadoEm;

const formatDate = (date?: string) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
};

const getInitials = (nome: string) =>
  nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const ACCENT_COLORS = ["#6366F1", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444"];
const getAccentColor = (index: number) =>
  ACCENT_COLORS[index % ACCENT_COLORS.length];

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {count !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </View>
  );
}

function AvatarCircle({
  nome,
  color,
  size = 40,
}: {
  nome: string;
  color: string;
  size?: number;
}) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color + "22",
          borderColor: color + "55",
        },
      ]}
    >
      <Text style={[styles.avatarText, { color, fontSize: size * 0.35 }]}>
        {getInitials(nome)}
      </Text>
    </View>
  );
}

function AlertBanner({ count }: { count: number }) {
  return (
    <View style={styles.alertBanner}>
      <Text style={styles.alertIcon}>⚠️</Text>
      <View>
        <Text style={styles.alertTitle}>Atenção necessária</Text>
        <Text style={styles.alertBody}>
          {count} hospital{count > 1 ? "is" : ""} sem médicos cadastrados
        </Text>
      </View>
    </View>
  );
}

function KpiRow({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <View style={styles.kpiRow}>
      <View style={[styles.kpiDot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.kpiLabel}>{label}</Text>
        {sub ? <Text style={styles.kpiSub}>{sub}</Text> : null}
      </View>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
    </View>
  );
}

function DayBar({
  day,
  count,
  max,
}: {
  day: string;
  count: number;
  max: number;
}) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <View style={styles.dayBarRow}>
      <Text style={styles.dayBarLabel}>{day}</Text>
      <View style={styles.dayBarTrack}>
        <View style={[styles.dayBarFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.dayBarCount}>{count}</Text>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [ambulatorios, setAmbulatorios] = useState<Ambulatorio[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = await AsyncStorage.getItem("userId");

      const [hospitaisData, ambulatoriosData, medicosData, userResponse] =
        await Promise.all([
          fetchHospitais(),
          fetchAmbulatorios(),
          fetchMedicos(),
          userId ? fetchUserById(userId) : Promise.resolve(null),
        ]);

      setHospitais(hospitaisData);
      setAmbulatorios(ambulatoriosData);
      setMedicos(medicosData);
      setUser(userResponse ?? null);
    } catch (err) {
      setError("Erro ao carregar o dashboard. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  // ── KPIs ──────────────────────────────────────────────────────────────────

  const last7Days = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const last30Days = Date.now() - 30 * 24 * 60 * 60 * 1000;

  const novosMedicos7d = medicos.filter(
    (m) => safeDate(getCreatedAt(m)) >= last7Days,
  ).length;

  const novosHospitais7d = hospitais.filter(
    (h) => safeDate(getCreatedAt(h)) >= last7Days,
  ).length;

  const novosMedicos30d = medicos.filter(
    (m) => safeDate(getCreatedAt(m)) >= last30Days,
  ).length;

  const medicosPorHospital =
    hospitais.length > 0 ? (medicos.length / hospitais.length).toFixed(1) : "0";

  const medicosComCarteira = medicos.filter((m) => m.carteira != null).length;

  const tiposMap = medicos.reduce<Record<string, number>>((acc, m) => {
    const tipo = m.tipo ?? "Não informado";
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  // ── Agrupamento por dia (últimos 7) ───────────────────────────────────────

  const medicosPorDia = useMemo(() => {
    const map: Record<string, number> = {};
    medicos.forEach((m) => {
      const raw = getCreatedAt(m);
      if (!raw) return;
      const day = raw.split("T")[0];
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7);
  }, [medicos]);

  const maxDayCount = Math.max(...medicosPorDia.map(([, v]) => v), 1);

  // ── Alertas ───────────────────────────────────────────────────────────────

  const hospitaisSemMedicos = hospitais.filter(
    (h) => !medicos.some((m) => m.hospitalId === h.id),
  );

  // ── Listas recentes ───────────────────────────────────────────────────────

  const recentMedicos = useMemo(
    () =>
      [...medicos]
        .sort((a, b) => safeDate(getCreatedAt(b)) - safeDate(getCreatedAt(a)))
        .slice(0, 6),
    [medicos],
  );

  const recentHospitais = useMemo(
    () =>
      [...hospitais]
        .sort((a, b) => safeDate(getCreatedAt(b)) - safeDate(getCreatedAt(a)))
        .slice(0, 5),
    [hospitais],
  );

  // ── Cards de estatísticas ─────────────────────────────────────────────────

  const stats = useMemo(
    () => [
      {
        label: "Médicos",
        value: medicos.length,
        icon: "people-outline",
        extra: `+${novosMedicos7d} esta semana`,
        color: "#6366F1",
      },
      {
        label: "Hospitais",
        value: hospitais.length,
        icon: "business-outline",
        extra: `+${novosHospitais7d} esta semana`,
        color: "#0EA5E9",
      },
      {
        label: "Ambulatórios",
        value: ambulatorios.length,
        icon: "medkit-outline",
        extra: "unidades ativas",
        color: "#10B981",
      },
      {
        label: "Méd / Hospital",
        value: medicosPorHospital,
        icon: "analytics-outline",
        extra: "média geral",
        color: "#F59E0B",
      },
    ],
    [medicos, hospitais, ambulatorios, novosMedicos7d, novosHospitais7d],
  );

  const handleReset = async () => {
    await AsyncStorage.removeItem("userId");
    setUser(null);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Carregando dashboard…</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bem-vindo de volta 👋</Text>
          <Text style={styles.title}>{user?.nome ?? "Dashboard"}</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>
        </View>
        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [styles.logoutBtn, pressed && styles.pressed]}
        >
          <Text
            style={styles.logoutText}
            onPress={() => router.replace("/login")}
          >
            Sair
          </Text>
        </Pressable>
      </View>

      {/* ── Erro ── */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={loadData}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </Pressable>
        </View>
      )}

      {/* ── Alerta hospitais sem médicos ── */}
      {hospitaisSemMedicos.length > 0 && (
        <View style={styles.section}>
          <AlertBanner count={hospitaisSemMedicos.length} />
        </View>
      )}

      {/* ── Stat cards ── */}
      <View style={styles.statsGrid}>
        {stats.map((item, i) => (
          <StatCard key={i} item={item as any} />
        ))}
      </View>

      {/* ── KPIs detalhados ── */}
      <View style={styles.section}>
        <SectionHeader title="Indicadores" />
        <View style={styles.card}>
          <KpiRow
            label="Novos médicos (30d)"
            value={novosMedicos30d}
            sub="cadastros no último mês"
            color="#6366F1"
          />
          <View style={styles.divider} />
          <KpiRow
            label="Com carteira funcional"
            value={medicosComCarteira}
            sub={`${medicos.length > 0 ? ((medicosComCarteira / medicos.length) * 100).toFixed(0) : 0}% do total`}
            color="#10B981"
          />
          <View style={styles.divider} />
          <KpiRow
            label="Hospitais sem médicos"
            value={hospitaisSemMedicos.length}
            sub="requerem atenção"
            color={hospitaisSemMedicos.length > 0 ? "#EF4444" : "#10B981"}
          />
        </View>
      </View>

      {/* ── Tipos de médicos ── */}
      {Object.keys(tiposMap).length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Médicos por tipo" count={medicos.length} />
          <View style={styles.card}>
            {Object.entries(tiposMap).map(([tipo, count], i) => (
              <View key={tipo}>
                {i > 0 && <View style={styles.divider} />}
                <KpiRow
                  label={tipo}
                  value={count}
                  sub={`${((count / medicos.length) * 100).toFixed(0)}% do total`}
                  color={getAccentColor(i)}
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ── Cadastros por dia ── */}
      {medicosPorDia.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Cadastros por dia (médicos)" />
          <View style={styles.card}>
            {medicosPorDia.map(([dia, count]) => (
              <DayBar
                key={dia}
                day={formatDate(dia)}
                count={count}
                max={maxDayCount}
              />
            ))}
          </View>
        </View>
      )}

      {/* ── Últimos médicos ── */}
      <View style={styles.section}>
        <SectionHeader title="Médicos recentes" count={recentMedicos.length} />
        <View style={styles.card}>
          {recentMedicos.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum médico cadastrado.</Text>
          ) : (
            recentMedicos.map((m, i) => (
              <View key={m.id}>
                {i > 0 && <View style={styles.divider} />}
                <View style={styles.listRow}>
                  <AvatarCircle nome={m.nome} color={getAccentColor(i)} />
                  <View style={styles.listInfo}>
                    <Text style={styles.listTitle}>{m.nome}</Text>
                    <Text style={styles.listSub}>
                      {m.tipo ?? "Tipo não informado"} · Mat. {m.matricula}
                    </Text>
                    {m.carteira && (
                      <Text style={styles.listTag}>
                        CRM {m.carteira.crm} · {m.carteira.orgaoExpedidor}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.listDate}>
                    {formatDate(getCreatedAt(m))}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>

      {/* ── Últimos hospitais ── */}
      <View style={styles.section}>
        <SectionHeader
          title="Hospitais recentes"
          count={recentHospitais.length}
        />
        <View style={styles.card}>
          {recentHospitais.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum hospital cadastrado.</Text>
          ) : (
            recentHospitais.map((h, i) => (
              <View key={h.id}>
                {i > 0 && <View style={styles.divider} />}
                <View style={styles.listRow}>
                  <AvatarCircle
                    nome={h.nome}
                    color={getAccentColor(i + 1)}
                    size={44}
                  />
                  <View style={styles.listInfo}>
                    <Text style={styles.listTitle}>{h.nome}</Text>
                    <Text style={styles.listSub}>
                      {h.endereco ?? "Endereço não informado"}
                    </Text>
                    {h.capacidade != null && (
                      <Text style={styles.listTag}>
                        Capacidade: {h.capacidade} leitos
                      </Text>
                    )}
                  </View>
                  <Text style={styles.listDate}>
                    {formatDate(getCreatedAt(h))}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>

      {/* ── Ambulatórios ── */}
      {ambulatorios.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Ambulatórios" count={ambulatorios.length} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {ambulatorios.map((a, i) => (
              <View
                key={a.id}
                style={[
                  styles.ambulatorioCard,
                  { borderTopColor: getAccentColor(i) },
                ]}
              >
                {a.sigla && (
                  <Text
                    style={[
                      styles.ambulatorioSigla,
                      { color: getAccentColor(i) },
                    ]}
                  >
                    {a.sigla}
                  </Text>
                )}
                <Text style={styles.ambulatorioNome}>{a.nome}</Text>
                <Text style={styles.ambulatorioCidade}>
                  {[a.cidade, a.estado].filter(Boolean).join(", ") || "—"}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}
