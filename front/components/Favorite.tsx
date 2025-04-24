import { ScrollView, StyleSheet, VirtualizedList } from "react-native";
import { ShopApi } from "@/api/shop";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import FavoriteCard from "@/components/FavoriteCard";
import { ApiResultInterface } from "@/entities/apiResult";
import { useAuthSession } from "@/context/UserContext";
import { styles } from "@/styles/styles";

export default function Favorite() {
  const [apiResult, setApiResult] = useState<ApiResultInterface[]>([]);
  const { user, isLoading } = useAuthSession();

  const handleSearchCommerce = async () => {
    const result = await ShopApi.getShop();
    if (result && result) {
      setApiResult(result); // On ne garde que les données utiles
    } else {
      console.error("Erreur : structure de réponse inattendue", result);
    }
  };

  useEffect(() => {
    handleSearchCommerce();
  }, []);

  const getItem = (_data: unknown, index: number) => apiResult[index];

  const getItemCount = () => apiResult.length;
  return (
    <View>
      <Text style={styles.subTitle}>Mes favoris</Text>
      {/* <Text style={styles.muted}>Tu n'as pas encore de favoris</Text> */}

      <VirtualizedList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardContainerFavorite}>
            <FavoriteCard
              name={item.name}
              location={item.adresse}
              imageUrl={item.picture}
              shopId={item.id}
              isFavorite={item.isFavorite}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
        contentContainerStyle={styles.horizontalListContent}
      />
    </View>
  );
}
