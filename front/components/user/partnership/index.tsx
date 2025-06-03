import { StyleSheet, VirtualizedList } from "react-native";
import { ShopApi } from "@/api/shop";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import MerchantCard from "@/components/MerchantCard";
import { ApiResultInterface } from "@/entities/apiResult";
import { useAuthSession } from "@/context/UserContext";

export default function Partnership() {
  // on refait notre use state et son type est un tableau de ApiResult (interface)
  const [apiResult, setApiResult] = useState<ApiResultInterface[]>([]);
  const { user, isLoading } = useAuthSession();

  const handleSearchCommerce = async () => {
    const result = await ShopApi.getShop();
    /* console.log("result : ", result); */
    /* SecureStore.deleteItemAsync("userToken"); */

    if (result && result) {
      setApiResult(result.slice(0, 10)); // On ne garde que les données utiles
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
    <>
    {/* <VirtualizedList
        renderItem={({ item }) => (
          <MerchantCard
            name={item.name}
            location={item.adresse}
            imageUrl={item.picture}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      /> */}
       <View>
      {apiResult.map((item) => (
        <MerchantCard
          key={item.id.toString()}
          name={item.name}
          location={item.adresse}
          imageUrl={item.picture}
          isFavorite={item.isFavorite}
          shopId={item.id}
        />
      ))}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
