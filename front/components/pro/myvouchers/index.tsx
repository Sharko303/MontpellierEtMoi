import { CommercantApi } from "@/api/commerceApi";
import { Toast } from "@/app/services/ToastService";
import { useAuthSession } from "@/context/UserContext";
import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styles } from "@/styles/styles";

const QRCodeGeneratorScreen = () => {
  const [numberOfQRCodes, setNumberOfQRCodes] = useState("");
  const [description, setDescription] = useState("");
  const [remainingPromoCodes, setRemainingPromoCodes] = useState(0);
  const authSession = useAuthSession();

  useEffect(() => {
    const fetchRemainingPromoCodes = async () => {
      
        const response = await CommercantApi.getRemainingPromoCodes(
          authSession.user.id
        );
        if (response.error) {
          Toast.show(
            "danger",
            response.message || "Erreur lors de la récupération des codes promo"
          );
          return;
        }
        setRemainingPromoCodes(response.remainingPromoCodes);
      
    };

    fetchRemainingPromoCodes();
  }, []);

  const handleGenerate = async () => {
    const number = parseInt(numberOfQRCodes);
    const data = { number, description, user: authSession.user };
    const response = await CommercantApi.createPromoCode(data);

    if (response.error) {
      Toast.show("danger", response.message || "Code QR invalide");
      return;
    }
    setRemainingPromoCodes(response.remainingPromoCodes);
    console.log(response);
    // on vide les champs
    setNumberOfQRCodes("");
    setDescription("");
    Toast.show("success", response.message || "Code QR généré");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, {backgroundColor: "white"}]}
    >
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View style={styles.right}>
          <TouchableOpacity style={styles.buttonSolde}>
            <Text style={[styles.textCenter, styles.bold]}>
              SOLDE : {remainingPromoCodes}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Générateur de Codes promo</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre de Codes promo</Text>
            <TextInput
              style={styles.input}
              value={numberOfQRCodes}
              onChangeText={setNumberOfQRCodes}
              keyboardType="numeric"
              placeholder="Entrez le nombre de QR codes"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Entrez la description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.center}>
            <TouchableOpacity
              style={[styles.btnCenter, styles.button]}
              onPress={handleGenerate}
            >
              <Text style={styles.buttonText}>Générer les Codes promo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default QRCodeGeneratorScreen;
