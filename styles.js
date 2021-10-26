import { StyleSheet } from "react-native";

export const globalSheet = StyleSheet.create({
  primaryBtn: {
    position: "absolute",
    bottom: 0,
    right: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 95,
    height: 34,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "dodgerblue",
  },
  shadowPrimary: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 16,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

export const global = {
  primaryColor: "#B58B8B",
  primaryLight: "rgba(181, 139, 139, 0.1)",
  padding: 16,
};
