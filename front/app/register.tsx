import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { z } from "zod";
import { UserApi } from "../api/userApi";
import { Link, router } from "expo-router";
import { styles } from "@/styles/styles";
import { Toast } from "./services/ToastService";

// Définition du schéma de validation avec Zod
const registerSchema = z
  .object({
    email: z.string().email("L'email est invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    passwordRetype: z.string(),
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordRetype, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordRetype"],
  });

export default function Register({
  onLoginPress,
}: {
  onLoginPress: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setpasswordRetype] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  const handleRegister = async () => {
    // Validation avec Zod
    const result = registerSchema.safeParse({
      email,
      password,
      passwordRetype,
      firstName,
      lastName,
    });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors(null);
      // Envoi des données d'enregistrement au serveur
      try {
        console.log("register", {
          email,
          password,
          passwordRetype,
          phoneNumber,
          firstName,
          lastName,
        });
        await UserApi.register({
          email,
          password,
          passwordRetype,
          phoneNumber,
          firstName,
          lastName,
        });
        console.log("Inscription réussie :", { email, password });
        Toast.show("success", "Inscription réussie !");
        router.replace("/login"); // Redirige vers la page de connexion après inscription
      } catch (error) {
        Toast.show("danger", "Erreur lors de l'inscription. Veuillez réessayer.");
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
    style={{ flex: 1, backgroundColor: "white" }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <Text style={styles.label}>Email*</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="email@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors?.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Prénom*</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Votre prénom"
      />
      {errors?.firstName && (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      )}

      <Text style={styles.label}>Nom*</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Votre nom"
      />
      {errors?.lastName && (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      )}

      <Text style={styles.label}>Téléphone (optionnel)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Votre numéro de téléphone"
        keyboardType="phone-pad"
      />
      {errors?.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <Text style={styles.label}>Mot de passe*</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="*************"
        secureTextEntry
      />
      {errors?.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Text style={styles.label}>Confirmez le mot de passe*</Text>
      <TextInput
        style={styles.input}
        onChangeText={setpasswordRetype}
        value={passwordRetype}
        placeholder="*************"
        secureTextEntry
      />
      {errors?.passwordRetype && (
        <Text style={styles.errorText}>{errors.passwordRetype}</Text>
      )}
      <View style={styles.center}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.loginPrompt}>Déjà un compte ?</Text>

      <Link replace href="/login">
        <Text style={styles.loginLink}>Se connecter</Text>
      </Link>
    </View>
    </KeyboardAvoidingView>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    textAlign: "center",
    color: "blue",
    fontSize: 16,
    marginTop: 5,
  },
});
 */
