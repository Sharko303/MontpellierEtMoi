import {
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { z } from "zod";
import { UserApi } from "@/api/userApi";
import { useAuthSession } from "@/context/UserContext";
import { styles } from "@/styles/styles";


// Définition du schéma Zod pour les validations
const loginSchema = z.object({
  email: z.string().email("L'email est invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function Login() {
  const [email, setEmail] = useState("thibault@gmail.com");
  const [password, setPassword] = useState("thibault");
  const authSession = useAuthSession();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
 /*  const { setUser } = useUser(); */
  const router = useRouter();
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
      authSession.signIn(response.token);
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
      <Text style={styles.title}>Ma Ville & Moi</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Pas de compte ? Inscrivez-vous</Text>
        <Link replace href="/register">
          <Text style={styles.registerLink}>S'inscrire</Text>
        </Link>
        <Link replace href="/registerpro">
          <Text style={styles.registerLink}>
            Je suis commerçant
          </Text>
        </Link>
      </View>
    </View>
  );
}

