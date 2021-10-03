import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import DefText from "../../components/DefText";

function Header() {
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        style={styles.eclipseImg}
        source={require("../../img/headerEclipse.png")}
      />
      <ImageBackground
        style={styles.imageBg}
        source={require("../../img/searchBg.png")}
      />
      <View style={{ marginTop: 75 }}>
        <DefText family="Rubik-Medium" size={48} color="rgba(255,255,255,0.85)">
          Odkrywaj
        </DefText>
      </View>
      <View style={{ position: "relative", left: -25, marginBottom: 20 }}>
        <DefText size={24} color="rgb(255,255,255)">
          tysiące książek
        </DefText>
      </View>
      <View style={{ position: "relative", left: 50 }}>
        <DefText
          family="OpenSans-Light"
          size={16}
          color="rgba(255,255,255,0.5)"
          align="center"
        >
          i dziel się z innymi...
        </DefText>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 240,
  },
  imageBg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  eclipseImg: {
    position: "absolute",
    top: 65,
    left: 35,
    width: 78,
    height: 81,
    zIndex: 2,
  },
});
