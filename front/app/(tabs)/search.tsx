import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  VirtualizedList,
} from "react-native";
import axios from "axios";
import MerchantCard from "@/components/MerchantCard";
import { ApiResultInterface } from "@/interface/apiResult";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiResultInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const searchEstablishments = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/apiresult/search?query=${text}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
    console.log("results:", results);
    setLoading(false);
  };

  const getItem = (_data: unknown, index: number) => results[index];

  const getItemCount = () => results.length;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un établissement..."
        value={query}
        onChangeText={searchEstablishments}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
