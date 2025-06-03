import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  View,
} from "react-native";
import { styles } from "@/styles/styles";

const LocationButton = ({ address }) => {
  const openMaps = () => {
    // Encode l'adresse pour l'URL
    const encodedAddress = encodeURIComponent(address);

    // URLs pour différentes plateformes
    const iosMapUrl = `maps:0,0?q=${encodedAddress}`;
    const androidMapUrl = `geo:0,0?q=${encodedAddress}`;
    const webMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    // Vérifie la plateforme et ouvre l'application appropriée
    if (Platform.OS === "ios") {
      Linking.canOpenURL(iosMapUrl)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(iosMapUrl);
          } else {
            return Linking.openURL(webMapUrl);
          }
        })
        .catch((error) => {
          Alert.alert("Erreur", "Impossible d'ouvrir l'application de carte");
        });
    } else if (Platform.OS === "android") {
      Linking.canOpenURL(androidMapUrl)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(androidMapUrl);
          } else {
            return Linking.openURL(webMapUrl);
          }
        })
        .catch((error) => {
          Alert.alert("Erreur", "Impossible d'ouvrir l'application de carte");
        });
    } else {
      Linking.openURL(webMapUrl);
    }
  };

  return (
    <View style={styles.center}>
      <TouchableOpacity style={styles.button} onPress={openMaps}>
        <Text style={styles.buttonText}>Ouvrir dans mon GPS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationButton;
