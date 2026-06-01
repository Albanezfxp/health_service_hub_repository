// src/navigation/BottomTabs.tsx

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "@/screens/DashboardScreen";
import MedicosScreen from "@/screens/MedicosScreen";
import HospitaisScreen from "@/screens/HospitaisScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 0,
          height: 65,
          elevation: 10,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Medicos") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Hospitais") {
            iconName = focused ? "business" : "business-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? "#6366F1" : "#9CA3AF"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Medicos" component={MedicosScreen} />
      <Tab.Screen name="Hospitais" component={HospitaisScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
