import { styles } from "@/styles/styles";
import { View, Text, TouchableOpacity } from "react-native";
import Counter from "./Counter";
import { useState } from "react";
import { Link, router } from "expo-router";

export default function PlayGame() {
  const [timerFinished, setTimerFinished] = useState(false);
  const startDate = new Date(Date.now() + 5000); // timer dans 2 secondes

  return (
    <View style={[styles.bgSecondary, styles.p4, styles.borderRounded]}>
      <Text style={styles.font5}>Jeu disponible dans :</Text>

      {!timerFinished ? (
        <Counter
          startDate={startDate}
          onTimerFinished={() => setTimerFinished(true)}
        />
      ) : (
        <TouchableOpacity
          style={[styles.btnPlay, styles.p2, styles.borderRounded, styles.mt2]}
          onPress={() => {
            router.navigate("/game/1");
          }}
        >
          <Text style={[styles.textWhite, styles.textCenter, styles.font5]}>
            Jouer
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
