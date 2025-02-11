import { ScrollView, StyleSheet, VirtualizedList } from "react-native";

import { ApiResult } from "@/api/apiResult";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import MerchantCard from "@/components/MerchantCard";
import { ApiResultInterface } from "@/interface/apiResult";

export default function TabOneScreen() {
  // on refait notre use state et son type est un tableau de ApiResult (interface)
  const [apiResult, setApiResult] = useState<ApiResultInterface[]>([]);
  const handleSearchCommerce = async () => {
    const result = await ApiResult.getApiResult();
    console.log("result : ", result);

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
      <VirtualizedList
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
      />
    </View>
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
});
