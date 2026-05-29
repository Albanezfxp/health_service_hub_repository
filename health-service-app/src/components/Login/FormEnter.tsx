import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { navigate } from "expo-router/build/global-state/routing";

interface FormEnterProps {
  handleLogin: (email: string, password: string) => void;
  isLogin: boolean;
  handleRegister: (
    email: string,
    password: string,
    confirm_password: string,
    nome: string,
  ) => void;
  toggleMode: () => void; // 👈 NOVO
}

export default function FormEnter({
  handleLogin,
  handleRegister,
  isLogin,
  toggleMode,
}: FormEnterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [nome, setNome] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.formContainer}>
      {/* NOME (somente no REGISTER) */}
      {!isLogin && (
        <>
          <Text style={styles.inputLabel}>Nome</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="text-outline"
              size={20}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#94A3B8"
              value={nome}
              onChangeText={setNome}
            />
          </View>
        </>
      )}

      {/* EMAIL */}
      <Text style={styles.inputLabel}>E-mail</Text>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#94A3B8"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="exemplo@hospital.com"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* SENHA */}
      <Text style={styles.inputLabel}>Senha</Text>
      <View style={styles.inputWrapper}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#94A3B8"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#94A3B8"
          />
        </TouchableOpacity>
      </View>

      {/* CONFIRMAR SENHA (somente no REGISTER) */}
      {!isLogin && (
        <>
          <Text style={styles.inputLabel}>Confirme sua senha</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              placeholderTextColor="#94A3B8"
              secureTextEntry={secureText}
              value={confirm_password}
              onChangeText={setConfirm_password}
            />
          </View>
        </>
      )}
      {/* ESQUECEU SENHA (somente LOGIN) */}
      {isLogin && (
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      )}

      {/* BOTÃO PRINCIPAL */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            isLogin
              ? handleLogin(email, password)
              : handleRegister(email, password, confirm_password, nome)
          }
        >
          <Text style={styles.loginButtonText}>
            {isLogin ? "LOGIN" : "REGISTRAR"}
          </Text>
        </TouchableOpacity>

        {/* BOTÃO SECUNDÁRIO */}
        <TouchableOpacity style={styles.registerButton} onPress={toggleMode}>
          <Text style={styles.loginButtonText}>
            {isLogin ? "CRIAR CONTA" : "FAZER LOGIN"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#1E293B",
    fontSize: 15,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#0D47A1",
    fontSize: 13,
    fontWeight: "500",
  },
  registerButton: {
    backgroundColor: "#7b8ca7",
    borderRadius: 8,
    height: 48,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#0D47A1",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  btnContainer: {
    margin: 20,
  },
});
