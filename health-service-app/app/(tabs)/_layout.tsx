import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colors = {
    primary: "#2A7F9E", // Azul do seu padrão
    textSecondary: "#6B7280", // Cinza para inativo
    background: "#FFFFFF",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Remove a barra superior padrão
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 70,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* 1. Tela Inicial / Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Atalho para Hospitais */}
      <Tabs.Screen
        name="hospital"
        options={{
          title: "Hospitais",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "business" : "business-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 3. Atalho para Ambulatórios */}
      <Tabs.Screen
        name="medicos"
        options={{
          title: "Medicos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
  name="equipamentos"
  options={{
    title: "Equipamentos",
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? "hardware-chip" : "hardware-chip-outline"}
        size={size}
        color={color}
      />
    ),
  }}
/>

        <Tabs.Screen
  name="auditorias"
  options={{
    title: "Auditorias",
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={focused ? "clipboard" : "clipboard-outline"}
        size={size}
        color={color}
      />
    ),
  }}
/>

      <Tabs.Screen
  name="requisicoes"
  options={{
    title: "Requisições",
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={
          focused
            ? "document-text"
            : "document-text-outline"
        }
        size={size}
        color={color}
      />
    ),
  }}
/>

      {/* 4. Escondendo o index da Navbar (já que ele só redireciona) */}
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Href null esconde o botão da barra
        }}
      />
    </Tabs>
  );
}
