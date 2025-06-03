import React, { useEffect, useState } from "react";
import Game from "@/components/Game";
import { Text, TouchableOpacity, View } from "react-native";
import { GameApi } from "@/api/game";
import { useSearchParams } from "expo-router/build/hooks";
import { useAuthSession } from "@/context/UserContext";
import { Toast } from "@/app/services/ToastService";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/styles";
import { router } from "expo-router";

export default function GameScreen() {
  const [game, setGame] = useState(null);
  const id = useSearchParams().get("id") as string;
  const authSession = useAuthSession();
  useEffect(() => {
    // on récupére le jeux
    GameApi.getById(id).then((game) => setGame(game));
    console.log("game", game);
  }, []);
  const handleSubmitAnswer = async (answer: string) => {
    // Logique de soumission de réponse
    if (!authSession.user) {
      console.log("no user");
      return;
    }
    const response = await GameApi.play(id, answer, authSession.user);
    console.log("response", response.message);
    if (response.status == 200) {
      Toast.show(
        "success",
        "Bravo vous avez gagné un code promo !"
      );
      return;
    } else {
      Toast.show("danger", response.message);
    }
  };

  const onGoBack = () => {
    console.log("test")
    router.back();
  };
  return (
    <View style={styles.container}>
      {/* Bouton de retour en haut à gauche */}
      <TouchableOpacity 
        style={styles.mt4}
        onPress={onGoBack}
      >
        <Ionicons name="arrow-back" size={24} color="primary" style={styles.backButton} />
      </TouchableOpacity>
      
      {game ? (
        <Game game={game} onSubmitAnswer={handleSubmitAnswer} />
      ) : (
        <Text>Chargement...</Text>
      )}
    </View>
  );
}
