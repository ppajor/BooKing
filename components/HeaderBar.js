import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DefText from "./DefText";

function HeaderBar({ image, iconName, name }) {
  return (
    <View style={{ width: "100%", height: 65, marginTop: 32, marginBottom: 16 }}>
      <ImageBackground style={styles.favImg} source={image} resizeMode="cover" />
      <View style={styles.overlay}></View>
      <View style={styles.favHeader}>
        <AntDesign style={{ marginRight: 8 }} name={iconName} size={24} color="orange" />
        <DefText family="Rubik-Medium" size={16} color="#fff">
          {name}
        </DefText>
      </View>
    </View>
  );
}

export default HeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginTop: 32,
  },
  favImg: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  favHeader: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
