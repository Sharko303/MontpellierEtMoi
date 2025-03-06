import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import Login from "../../login";
import { UserApi } from "@/api/userApi";
import { useAuthSession } from "@/context/UserContext";
import { set } from "react-hook-form";

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authSession = useAuthSession();
  console.log("authSession", authSession);
/*   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const user = await UserApi.getMe();
          console.log("user", user);
          setIsLoggedIn(!!user); // Convertit `user` en boolean (true si connecté, false sinon)
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur", error);
          setIsLoggedIn(false);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [])
  );
 */
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!authSession.user) {
    console.log("isLoggedIn", isLoggedIn) ;
    return <Login />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Montpellier & Moi</Text>
      <Text>Bienvenue sur votre compte !</Text>
      <Button
        title="Déconnexion"
        onPress={() => UserApi.logout().then(() => authSession.signOut())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
