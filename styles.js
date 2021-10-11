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
});

export const global = {
  primaryColor: "#B58B8B",
  primaryLight: "rgba(181, 139, 139, 0.1)",
  padding: 16,
};
