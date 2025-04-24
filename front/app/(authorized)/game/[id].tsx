import React, { useEffect, useState } from "react";
import Game from "@/components/Game";
import { Text } from "react-native";
import { GameApi } from "@/api/game";
import { useSearchParams } from "expo-router/build/hooks";
import { useAuthSession } from "@/context/UserContext";
import { Toast } from "@/app/services/ToastService";

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
        response.message || "Bravo vous avez gagné un code promo !"
      );
    } else {
      Toast.show("danger", response.message || "Mauvaise réponse");
    }
  };
  return game ? (
    <Game game={game} onSubmitAnswer={handleSubmitAnswer} />
  ) : (
    <Text>Chargement...</Text>
  );
}
