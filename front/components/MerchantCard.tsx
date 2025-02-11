
import { View, Text, Image, StyleSheet } from "react-native";
const defaultImage = require('../assets/images/bk.jpeg');
export default function MerchantCard({ name, location, imageUrl } : { name: string, location: string, imageUrl: string }) {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: imageUrl != '' ??   }} style={styles.image} />  On affiche l'image s'il y en a une sinon on prend un image par default */}
      <Image source={imageUrl && imageUrl !== "" ? { uri: imageUrl } : defaultImage} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
