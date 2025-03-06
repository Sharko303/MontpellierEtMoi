import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import Login from "../../login";
import { UserApi } from "@/api/userApi";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useAuthSession } from "@/context/UserContext";
import { CodePromo } from "@/api/codePromo";
import { set } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { Toast } from "@/app/services/ToastService";

export default function Account() {
  const authSession = useAuthSession();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  const [isScanning, setIsScanning] = useState(false);
  let loading = false

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function scan(data: any) {
    // if (isScanning) return;
    if (loading) return;
    // on envois a notre backend le code qr scanné
    console.log("response", isScanning);
    loading = true
    // setIsScanning(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await CodePromo.get(data.data);
      console.log("response", response);
      if (response.error) {
        Toast.show("warning", response.message || "Code QR invalide");
        //setIsScanning(false);
        return;
      }

      setDescription(response.description);
      setResult(true);
    } catch (error: any) {
      Toast.show("danger", error.response?.data?.message || "Erreur inconnue");
    }
    // Si le scan a échoué, réactiver le scan après un délai
    if (!result) {
      setTimeout(() => {
        loading = false
        // setIsScanning(false);
      }, 2000); // 2 secondes de délai entre les tentatives
    }
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Traitement du QR code...</Text>
        </View>
      )}
      {result ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.resultCard}>
            <View style={styles.successIconContainer}>
              <AntDesign name="checkcircle" size={60} color="#00C851" />
            </View>

            <Text style={styles.successTitle}>
              Code promo utilisé avec succès !
            </Text>

            <View style={styles.detailsContainer}>
              <View style={styles.promoContainer}></View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Description:</Text>
                <Text style={styles.descriptionValue}>{description}</Text>
              </View>
            </View>

            <Pressable
              style={styles.backButton}
              onPress={() => setResult(false)}
              android_ripple={{ color: "blue" }}
            >
              <AntDesign
                name="arrowleft"
                size={20}
                color="#fff"
                style={styles.backButtonIcon}
              />
              <Text style={styles.backButtonText}>Retour au scanner</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      ) : (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scan}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 30,
  },
  promoContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  promoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    width: "40%",
  },
  promoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    width: "60%",
  },
  descriptionContainer: {
    width: "100%",
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  descriptionValue: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backButtonIcon: {
    marginRight: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});
