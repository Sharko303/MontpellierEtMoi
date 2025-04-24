import React from "react";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NumberCard from "./NumberCard";

export default function Counter({ startDate, onTimerFinished }) {
  const targetTime = new Date(startDate).getTime();
  const [currentTime, setCurrentTime] = useState(Date.now());

  const timeBetween = targetTime - currentTime;

  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeBetween % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeBetween % (1000 * 60)) / 1000);

  const totalHours = days * 24 + hours;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = targetTime - now;
      if (remaining <= 0) {
        clearInterval(interval);
        onTimerFinished();
      } else {
        setCurrentTime(now);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime, onTimerFinished]);

  return (
    <View style={styles.container}>
      <NumberCard number={totalHours} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={minutes} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={seconds} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "center"
  },
  colorDivider: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
