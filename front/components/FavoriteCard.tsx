import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
const defaultImage = require("../assets/images/bk.jpeg");
import { styles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { FavoriteApi } from "@/api/favorite";
import { useAuthSession } from "@/context/UserContext";
export default function FavoriteCard({
  name,
  location,
  imageUrl,
  isFavorite = false,
  shopId,
  onToggleFavorite,
}: {
  name: string;
  location: string;
  imageUrl: string;
  isFavorite?: boolean;
  shopId?: number;
  onToggleFavorite?: (name: string) => void;
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  const user = useAuthSession();
  const handleToggleFavorite = () => {
    // Si une fonction de callback est fournie, utilisez-la
    if (onToggleFavorite) {
      onToggleFavorite(name);
    } else {
      // Sinon, gérez localement
      setFavorite(!favorite);
      console.log("shop iddddd", shopId);
      if(user?.user?.id && shopId) {
        FavoriteApi.update(user?.user?.id?.valueOf(), shopId)
      }
    }
  };

  // Détermine si on utilise l'état local ou la prop
  const isCurrentlyFavorite = onToggleFavorite ? isFavorite : favorite;

  return (
    <View style={styles.cardFavorite}>
      {/* Position relative pour le conteneur d'image pour positionner le cœur */}
      <View style={styles.imageContainer}>
        <Image
          source={
            imageUrl && imageUrl !== "" ? { uri: imageUrl } : defaultImage
          }
          style={styles.image}
        />
        {/* Bouton coeur positionné en haut à droite */}
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
      </View>
      <View style={[styles.info, styles.mt2]}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}
