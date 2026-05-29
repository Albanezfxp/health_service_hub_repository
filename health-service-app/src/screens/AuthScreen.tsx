import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormEnter from "@/components/Login/FormEnter";
import { RegisterUserRequest } from "@/types/interfaces/RegisterUserRequest";
import { fetchLogin, fetchRegisterUser } from "@/services/api";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [scaleAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [scaleAnim]);

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      const payload = {
        email: email,
        senha: password,
      };

      const response = await fetchLogin(payload);
      console.log(`Usuario logado: ${response}`);
      // Aqui você pode adicionar a navegação para a próxima tela
    } catch (error: any) {
      if (error.response) {
        console.log("Erro API:", error.response.data);
        ToastAndroid.show(
          error.response.data?.message || "Erro ao fazer login",
          ToastAndroid.SHORT,
        );
      } else {
        console.log("Erro geral:", error.message);
        ToastAndroid.show("Erro de conexão", ToastAndroid.SHORT);
      }
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    confirm_password: string,
    nome: string,
  ): Promise<void> => {
    if (password !== confirm_password) {
      ToastAndroid.show("Senhas não conferem", ToastAndroid.SHORT);
      return;
    }

    try {
      const payload = {
        nome,
        email,
        senha: password,
        confirm_password: confirm_password,
      };

      const response = await fetchRegisterUser(payload);
      console.log("Usuário criado:", response);
      ToastAndroid.show("Conta criada com sucesso!", ToastAndroid.SHORT);
      setIsLogin(true);
    } catch (error: any) {
      if (error.response) {
        console.log("Erro API:", error.response.data);
        ToastAndroid.show(
          error.response.data?.message || "Erro ao criar conta",
          ToastAndroid.SHORT,
        );
      } else {
        console.log("Erro geral:", error.message);
        ToastAndroid.show("Erro de conexão", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.safeArea.backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          {/* HEADER / LOGO AREA */}
          <Animated.View
            style={[
              styles.headerContainer,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.logoIconBg}>
              <Ionicons name="business-outline" size={45} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>Health Service Hub</Text>
            <Text style={styles.subtitle}>Gestão Hospitalar Integrada</Text>

            {/* Cards informativos */}
            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <Ionicons name="medical" size={20} color="#007AFF" />
                <Text style={styles.infoText}>Hospitais</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="people" size={20} color="#34C759" />
                <Text style={styles.infoText}>Médicos</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="checkmark-circle" size={20} color="#FF9500" />
                <Text style={styles.infoText}>Auditorias</Text>
              </View>
            </View>
          </Animated.View>

          {/* FORM AREA */}
          <View style={styles.formArea}>
            <FormEnter
              handleLogin={handleLogin}
              isLogin={isLogin}
              handleRegister={handleRegister}
              toggleMode={() => {
                setIsLogin(!isLogin);
              }}
            />
          </View>

          {/* DECORATIVE ELEMENTS */}
          <View style={styles.decorativeElements}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Core Layout
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F9F9",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F9F9",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },

  // Header / Logo Section
  headerContainer: {
    alignItems: "center",
    marginBottom: 36,
    marginTop: 16,
  },
  logoIconBg: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#2A7F9E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#2A7F9E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 24,
    letterSpacing: 0.2,
  },

  // Info Cards
  infoCards: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginTop: 16,
  },
  infoCard: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3CB371",
    gap: 6,
  },
  infoText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },

  // Form Area
  formArea: {
    width: "100%",
    marginBottom: 24,
  },

  // Decorative Elements
  decorativeElements: {
    position: "relative",
    height: 100,
    marginTop: 20,
  },
  circle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D1FAE5",
    opacity: 0.5,
    right: -40,
    bottom: 20,
  },
  circle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0F2FE",
    opacity: 0.6,
    left: -30,
    top: 10,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },
});
