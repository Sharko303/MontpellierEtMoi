import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: "#2E2E2E",
  },
  title: {
    position: "absolute",
    width: "100%",
    fontSize: 50,
    top: 100,
    marginTop: 0,
    textAlign: "center",
  },
  input: {
    marginTop: 20,
  },
  pressable: {
    backgroundColor: "#D5DC3C",
    borderRadius: 20,
    height: 50,
    width: 150,
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
  },
  pressableText: {
    textAlign: "center",
    color: "#2E2E2E",
    fontSize: 20,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  label: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    zIndex: 1,
    opacity: 1,
    transform: "translateX(0px) translateY(-16px)",
    fontSize: 10,
    color: "rgb(73, 101, 140)",
  },
  view: {
    backgroundColor: "#2E2E2E",
    gap: 20,
  },
  link: {
    marginTop: 20,
    color: "#D5DC3C",
    fontSize: 20,
  },
  step: {
    backgroundColor: "#2E2E2E",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16, // Vous pouvez ajuster le padding selon vos besoins
    margin: 16, // Vous pouvez ajuster le margin selon vos besoins
    gap: 50, // Vous pouvez ajuster le gap selon vos besoins
  },
  pressableStep: {
    backgroundColor: "#D5DC3C",
    borderRadius: 20,
    height: 50,
    width: 125,
    padding: 10,
    borderWidth: 1,
  },
  pressableStepText: {
    textAlign: "center",
    color: "#2E2E2E",
    fontSize: 20,
  },
  pressablePrevStep: {
    backgroundColor: "#2E2E2E",
    borderColor: "#D5DC3C",
    borderRadius: 20,
    height: 50,
    width: 125,
    padding: 10,
    borderWidth: 1,
  },
  pressablePrevStepText: {
    textAlign: "center",
    color: "#D5DC3C",
    fontSize: 20,
  },
  inputSame: {
    color: "#fffff",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    flex: 1,
    zIndex: 997,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
});
