import {
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  StyleProp,
  TextStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { z } from "zod";
import { UserApi } from "@/api/userApi";

// Définition du schéma Zod pour les validations
const loginSchema = z.object({
  email: z.string().email("L'email est invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Validation des données
    const result = loginSchema.safeParse({ email, password });
    if (result.success) {
      // Les données sont valides
      const response = await UserApi.login({ email, password });
  
      if (response.error) {
        // Afficher une alerte en cas d'erreur
        Alert.alert("Erreur de connexion", response.error.message);
        return;
      }
  
      Alert.alert("Connexion réussie !");
    } else {
      // Gérer les erreurs de validation
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path.includes("email")) {
          fieldErrors.email = error.message;
        }
      });
      setErrors(fieldErrors);
      console.log("error", errors);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Montpellier & Moi</Text>
      {/* On affiche l'erreur si on n'arrive pas a ce connecter */}
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          errors.email ? (styles.inputError as StyleProp<TextStyle>) : null,
        ]}
        onChangeText={setEmail}
        value={email}
        placeholder="email@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[
          styles.input,
          errors.password ? (styles.inputError as StyleProp<TextStyle>) : null,
        ]}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        placeholder="*************"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.center}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
        <Text style={styles.label}>Pas de compte ? Inscrivez-vous</Text>
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("register")}
          >
            S'inscrire
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 22,
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    padding: 15,
    margin: 10,
    width: 200,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  center: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  registerLink: {
    textAlign: "center",
    color: "blue",
    fontSize: 16,
    marginTop: 5,
  },
});
