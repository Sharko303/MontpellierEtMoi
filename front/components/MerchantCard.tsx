
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "@/styles/styles"; // Assurez-vous que le chemin est correct
const defaultImage = require('../assets/images/bk.jpeg');
export default function MerchantCard({ name, location, imageUrl, isFavorite = false, onToggleFavorite, } : { name: string, location: string, imageUrl: string, onToggleFavorite?: (name: string) => void, isFavorite?: boolean }) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggleFavorite = () => {
    // Si une fonction de callback est fournie, utilisez-la
    if (onToggleFavorite) {
      onToggleFavorite(name);
    } else {
      // Sinon, gérez localement
      setFavorite(!favorite);
    }
  };

  // Détermine si on utilise l'état local ou la prop
  const isCurrentlyFavorite = onToggleFavorite ? isFavorite : favorite;

  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: imageUrl != '' ??   }} style={styles.image} />  On affiche l'image s'il y en a une sinon on prend un image par default */}
      <Image source={imageUrl && imageUrl !== "" ? { uri: imageUrl } : defaultImage} style={styles.imageCard} />
      <TouchableOpacity
          style={styles.heartButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isCurrentlyFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isCurrentlyFavorite ? "#ff0000" : "#ffffff"}
          />
        </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
}

/* const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
});
 */