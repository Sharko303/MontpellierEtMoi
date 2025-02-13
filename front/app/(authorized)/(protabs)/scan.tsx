import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import Login from "../../login";
import { UserApi } from "@/api/userApi";
import { useAuthSession } from "@/context/UserContext";

export default function Account() {
  const navigation = useNavigation();
  const authSession = useAuthSession();

  return (
    <View style={styles.container}>
      
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
