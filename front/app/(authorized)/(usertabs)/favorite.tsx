import {
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  VirtualizedList,
} from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { Text, View } from "@/components/Themed";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { UserApi } from "@/api/userApi";
import { useAuthSession } from "@/context/UserContext";
import Search from "@/components/search";
import { styles } from "@/styles/styles";
import CategoryList from "@/components/CategoryList";
import ShopCategory from "@/components/ShopCategory";
import { FavoriteApi } from "@/api/favorite";
import { set } from "react-hook-form";

export default function Favorite() {
  const [shops, setShop] = useState([]);
  const user = useAuthSession();
  async function handleSearchCommerce() {
    const result = await FavoriteApi.getAllByUserId(user.user.id);
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
  );

  console.log("shops", shops);
  const getItem = (_data: unknown, index: number) => shops[index];

  const getItemCount = () => shops.length;

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={styles.titleHeader}>Mes favoris</Text>
      <Search />
      <CategoryList />
      <Text style={styles.subTitle}> Food </Text>
      {shops.length === 0 ? (
        <Text style={styles.info}>Aucun favoris !</Text>
      ) : (
        <VirtualizedList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardContainerFavorite}>
              <ShopCategory
                name={item.name}
                imageUrl={item.picture}
                shopId={item.id}
                isFavorite={item.isFavorite}
                category="test"
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          getItemCount={getItemCount}
          getItem={getItem}
          contentContainerStyle={styles.horizontalListContent}
        />
      )}
    </ScrollView>
  );
}
