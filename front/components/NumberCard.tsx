import React from "react";
import { StyleSheet, Text, View } from "react-native";

function NumberCard({ number = 0 }) {
  function numberText() {
    /*
     * The logic here is to keep the values to 00 in any case where the time can be invalid.
     * First check for undefined/null and if the value is a positive number using Math.sign (https://www.geeksforgeeks.org/javascript-math-sign-function/)
     * Then it checks for if the length of number is 1. If it's one we concat '0' with the number if not then we render the number as it is.
     * Then by default it'll be '00'
     */
    if (number && Math.sign(number) >= 0) {
      if (number.toString().length === 1) {
        return ("0" + number).slice(-2);
      } else {
        return number;
      }
    } else {
      return "00";
    }
  }
  const renderNumber = () => <Text style={styles.number}>{numberText()}</Text>;

  return <View style={styles.container}>{renderNumber()}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
    margin: 4,
    borderRadius: 8,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1f1f1f",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5
  },
  number: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default NumberCard;
