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
  btn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#B58B8B",
    borderRadius: 8,
  },
  shadowPrimary: {
    shadowColor: "black",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    paddingLeft: 16,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  lineInput: {
    width: "100%",
    fontSize: 24,
    borderBottomColor: "#B58B8B",
    borderBottomWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 16,
    color: "rgba(0,0,0,0.75)",
  },
  multilineInput: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderColor: "#B58B8B",
    borderWidth: 2,
    borderRadius: 12,
    color: "rgba(0,0,0,0.75)",
  },
});

export const global = {
  primaryColor: "#B58B8B",
  primaryLight: "rgba(181, 139, 139, 0.1)",
  padding: 16,
};
