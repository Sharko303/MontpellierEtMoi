import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuthSession } from "@/context/UserContext";
import Search from "@/components/search";
import CategoryList from "@/components/CategoryList";
import PlayGame from "@/components/PlayGame";
import { styles } from "@/styles/styles";
import Favorite from "@/components/Favorite";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { CodePromo } from "@/api/codePromo";
import QRCode from "react-native-qrcode-svg";
import LocationButton from "@/components/ButtonLocation";

const { width } = Dimensions.get("window");

export default function PromoCode() {
  const user = useAuthSession();
  const [codePromo, setCodePromo] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("valid");
  const [selectedCode, setSelectedCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function handleGetCodePromo() {
    const result = await CodePromo.get();
    if (result) {
      setCodePromo(result);
    } else {
      setCodePromo([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleGetCodePromo();
    }, [])
  );

  const getFilteredCodes = () => {
    switch (selectedFilter) {
      case "valid":
        return codePromo.filter(
          (code) => code.valid && new Date(code.expiration) > new Date()
        );
      case "expired":
        return codePromo.filter(
          (code) => new Date(code.expiration) < new Date() && code.valid
        );
      case "used":
        return codePromo.filter((code) => !code.valid);
      default:
        return codePromo;
    }
  };

  const openCodeDetail = (code) => {
    setSelectedCode(code);
    setModalVisible(true);
  };

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      {/* <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "all" && styles.activeFilter,
        ]}
        onPress={() => setSelectedFilter("all")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "all" && styles.activeFilterText,
          ]}
        >
          Tous
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "valid" && styles.activeFilter,
        ]}
        onPress={() => setSelectedFilter("valid")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "valid" && styles.activeFilterText,
          ]}
        >
          Valides
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "expired" && styles.activeFilter,
        ]}
        onPress={() => setSelectedFilter("expired")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "expired" && styles.activeFilterText,
          ]}
        >
          Expirés
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "used" && styles.activeFilter,
        ]}
        onPress={() => setSelectedFilter("used")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "used" && styles.activeFilterText,
          ]}
        >
          Utilisés
        </Text>
      </TouchableOpacity>
    </View>
  );

  const getCodeStatus = (code) => {
    if (!code.valid) return { status: "Utilisé", color: "#FFC067" };
    if (new Date(code.expiration) < new Date())
      return { status: "Expiré", color: "#FF6B6B" };
    return { status: "Valide", color: "#7DC0AF" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.mainTitle}>Mes codes promos</Text> */}

      {renderFilterButtons()}

      <ScrollView style={styles.scrollContainer}>
        {getFilteredCodes().length === 0 ? (
          <Text style={styles.info}>Aucun code promo dans cette catégorie</Text>
        ) : (
          <View style={styles.cardGrid}>
            {getFilteredCodes().map((item, index) => {
              const codeStatus = getCodeStatus(item);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.cardContainerPromo}
                  onPress={() => openCodeDetail(item)}
                >
                  <View
                    style={[
                      styles.cardPromo,
                      { borderBottomColor: codeStatus.color },
                    ]}
                  >
                    <ImageBackground
                      source={{ uri: `https://picsum.photos/150/150#${index}` }}
                      style={styles.cardContent}
                    >
                      <Text style={[styles.expiration, ,]}>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: codeStatus.color },
                          ]}
                        >
                          <Text style={styles.statusText}>
                            {codeStatus.status}
                          </Text>
                        </View>
                      </Text>
                    </ImageBackground>
                    <View style={styles.qrThumbnail}>
                      <Text numberOfLines={1} style={[styles.font3, styles.mt1]}>
                        {item.shop.denominationUsuelle}
                      </Text>
                      <Text style={styles.expiration}>Expire le: {formatDate(item.expiration)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Modal pour afficher les détails du QR Code */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedCode && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{selectedCode.name}</Text>

              <View style={styles.qrContainer}>
                <QRCode
                  value={selectedCode.id || "CODE_PLACEHOLDER"}
                  size={200}
                  backgroundColor="white"
                />
              </View>

              <Text style={styles.modalDescription}>
                {selectedCode.description}
              </Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Magasin:</Text>
                  <Text style={styles.detailValue}>
                    {selectedCode.shop.denominationUsuelle}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Adresse:</Text>
                  <Text style={styles.detailValue}>
                    {selectedCode.shop.adresseEtablissement}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Statut:</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getCodeStatus(selectedCode).color },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getCodeStatus(selectedCode).status}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date d'expiration:</Text>
                  <Text style={styles.detailValue}>
                    {formatDate(selectedCode.expiration)}
                  </Text>
                </View>
                {selectedCode.conditions && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Conditions:</Text>
                    <Text style={styles.detailValue}>
                      {selectedCode.conditions}
                    </Text>
                  </View>
                )}

                {/* Bouton qui ouvre dans maps ou un gps */}
                <LocationButton
                  address={selectedCode.shop.adresseEtablissement}
                />
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const stylesOverride = StyleSheet.create({
  titleOverride: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
