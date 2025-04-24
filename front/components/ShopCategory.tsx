import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "@/styles/styles"; // Assurez-vous que le chemin est correct
import { useAuthSession } from "@/context/UserContext";
import { FavoriteApi } from "@/api/favorite";
const defaultImage = require("../assets/images/bk.jpeg");

export default function ShopCategory({
  category,
  name,
  imageUrl,
  isFavorite = false,
  shopId,
  onToggleFavorite,
}: {
  category: string;
  name: string;
  imageUrl: string;
  shopId?: number;
  onToggleFavorite?: (name: string) => void;
  isFavorite?: boolean;
}) {
  const user = useAuthSession();
  const [favorite, setFavorite] = useState(isFavorite);
console.log(category, name, imageUrl, isFavorite, shopId, onToggleFavorite);
  const handleToggleFavorite = () => {
    // Si une fonction de callback est fournie, utilisez-la
    if (onToggleFavorite) {
      onToggleFavorite(name);
    } else {
      // Sinon, gérez localement
      setFavorite(!favorite);
      if (user?.user?.id && shopId) {
        FavoriteApi.update(user?.user?.id?.valueOf(), shopId?.valueOf());
      }
    }
  };

  // Détermine si on utilise l'état local ou la prop
  const isCurrentlyFavorite = onToggleFavorite ? isFavorite : favorite;

  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: imageUrl != '' ??   }} style={styles.image} />  On affiche l'image s'il y en a une sinon on prend un image par default */}
      <Image
        source={imageUrl && imageUrl !== "" ? { uri: imageUrl } : defaultImage}
        style={styles.imageCard}
      />
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
      </View>
    </View>
  );
}
