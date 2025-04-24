import { useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  VirtualizedList,
  Pressable,
  Modal,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import MerchantCard from "../components/MerchantCard";
import { styles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons"; // Assurez-vous d'installer expo/vector-icons si ce n'est pas déjà fait
import { set } from "react-hook-form";

interface ApiResultInterface {
  id: number;
  name: string;
  adresse: string;
  picture: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiResultInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const searchEstablishments = async (text: string) => {
    setQuery(text);

    // Si la modal est déjà ouverte, on met à jour la recherche
    // Sinon on ne fait rien pour permettre à l'utilisateur de finir sa saisie
    if (modalVisible && text.length >= 2) {
      executeSearch(text);
    } else if (text.length < 2 && modalVisible) {
      setResults([]);
    }
  };
  const searchPress = () => {
    setModalVisible(true);
  };
  const executeSearch = async (text: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/shop/search?query=${text}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
    console.log("results:", results);
    setLoading(false);
  };

  const handleSearchButtonPress = () => {
    if (query.length >= 2) {
      setModalVisible(true);
      executeSearch(query);
    }
  };

  const getItem = (_data: unknown, index: number) => results[index];
  const getItemCount = () => results.length;

  const handleSelectEstablishment = (item: ApiResultInterface) => {
    // Navigation vers la page de détail de l'établissement
    // router.push(`/establishment/${item.id}`);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.mt3}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#757575" />
        <TextInput
          style={[styles.input, styles.searchInput]}
          placeholder="Restaurants, bars, commerces..."
          value={query}
          onChangeText={searchEstablishments}
          onPress={searchPress}
        />
      </View>

      {/* Modal pour afficher les résultats de recherche */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={[styles.fullScreenModal]}>
          <StatusBar barStyle="dark-content" />

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={styles.backButton.color}
              />
            </TouchableOpacity>
          </View>

          {/* Champ de recherche dans la modal pour permettre la saisie continue */}
          <View style={styles.modalSearchContainer}>
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Recherche..."
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                if (text.length >= 2) {
                  executeSearch(text);
                } else {
                  setResults([]);
                }
              }}
              autoFocus={true}
            />
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loader}
            />
          ) : (
            <>
              {results.length === 0 ? (
                <Text style={styles.noResults}>Aucun résultat trouvé</Text>
              ) : (
                <VirtualizedList
                  style={styles.resultsList}
                  contentContainerStyle={styles.resultsContainer}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelectEstablishment(item)}
                      style={styles.resultItem}
                    >
                      <MerchantCard
                        name={item.name}
                        location={item.adresse}
                        imageUrl={item.picture}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  getItemCount={getItemCount}
                  getItem={getItem}
                />
              )}
            </>
          )}
        </SafeAreaView>
      </Modal>

      <Pressable
        style={styles.btn}
        onPress={() => {
          router.replace("/game/1");
        }}
      />
    </View>
  );
}
