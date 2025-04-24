import { ScrollView, StyleSheet, VirtualizedList } from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuthSession } from "@/context/UserContext";
import Search from "@/components/search";
import CategoryList from "@/components/CategoryList";
import PlayGame from "@/components/PlayGame";
import { styles } from "@/styles/styles";
import Favorite from "@/components/Favorite";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function promoCode() {
  const user = useAuthSession();
/*   async function handleSearchCommerce() {
    const result = await codePromo.getAllByUserId(user.user.id);
    if (result) {
      setShop(result); // On ne garde que les données utiles
    } else {
      setShop([]); // Si aucune donnée n'est trouvée, on vide le tableau
    }
  }
  useFocusEffect(
    useCallback(() => {
      handleSearchCommerce();
    }, [])
  ); */
  return (
    <>
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={styles.subTitle}>Aucun code promos gagné !</Text>
      {/* <Partnership /> */}
    </ScrollView>
    </>
  );
}

const stylesOverride = StyleSheet.create({
  titleOverride: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
