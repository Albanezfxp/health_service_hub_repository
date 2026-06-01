import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import HospitalCard from "../components/Login/Hospital/HospitalCard";

import { Hospital } from "@/types/interfaces/Hospital";

import {
  createHospital,
  deleteHospital,
  getHospitais,
  updateHospital,
} from "@/services/hospital.service";


import { COLORS } from "@/theme/colors";

import HospitalForm from "../components/Login/Hospital/HospitalForm";

export default function HospitalScreen() {
  const [hospitais, setHospitais] =
    useState<Hospital[]>([]);

  const [loading, setLoading] =
    useState(true);
  const [modalVisible, setModalVisible] =
  useState(false);

  const [hospitalSelecionado, setHospitalSelecionado] =
  useState<Hospital | null>(null);

  useEffect(() => {
    carregarHospitais();
  }, []);

  async function carregarHospitais() {
    try {
      setLoading(true);

      const data =
        await getHospitais();

      setHospitais(data);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os hospitais."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string,
  ) {
    Alert.alert(
      "Excluir Hospital",
      "Deseja realmente excluir este hospital?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",

          style: "destructive",

          onPress: async () => {
            try {
              await deleteHospital(id);

              carregarHospitais();
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Erro",
                "Não foi possível excluir."
              );
            }
          },
        },
      ]
    );
  }

  function handleEdit(
  hospital: Hospital,
) {
  setHospitalSelecionado(hospital);

  setModalVisible(true);
  } 

  async function handleSave(
  dados: {
    nome: string;
    endereco: string;
    capacidade?: number;
  },
) {
  try {

    if (hospitalSelecionado) {

      await updateHospital(
        hospitalSelecionado.id,
        dados,
      );

    } else {

      await createHospital(
        dados,
      );

    }

    setModalVisible(false);

    setHospitalSelecionado(null);

    carregarHospitais();

  } catch (error) {
    console.log(error);

    Alert.alert(
      "Erro",
      "Não foi possível salvar."
    );
  }
}

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Hospitais
        </Text>

        <Text style={styles.subtitle}>
          Gestão Hospitalar
        </Text>
      </View>

      <FlatList
        data={hospitais}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <HospitalCard
            hospital={item}
            onDelete={
              handleDelete
            }
            onEdit={handleEdit}
          />
        )}
      />

     <TouchableOpacity
  style={styles.fab}
  onPress={() => {
    setHospitalSelecionado(null);
    setModalVisible(true);
  }}
>
  <Ionicons
    name="add"
    size={30}
    color="#FFF"
  />
</TouchableOpacity>

<HospitalForm
  visible={modalVisible}
  hospital={hospitalSelecionado}
  onClose={() => {
    setModalVisible(false);
    setHospitalSelecionado(null);
  }}
  onSave={handleSave}
/>

</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,

    paddingHorizontal: 20,

    paddingTop: 60,
  },

  loading: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor:
      COLORS.background,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,

    fontWeight: "700",

    color: COLORS.text,
  },

  subtitle: {
    fontSize: 15,

    color:
      COLORS.textSecondary,

    marginTop: 4,
  },

  fab: {
    position: "absolute",

    bottom: 30,

    right: 25,

    width: 65,

    height: 65,

    borderRadius: 32,

    backgroundColor:
      COLORS.primary,

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.2,

    shadowRadius: 5,

    elevation: 8,
  },
});