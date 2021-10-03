import React, { Children } from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function DefText(props) {
  const {
    family = "OpenSans-Regular",
    size = 16,
    align = "left",
    bold = false,
    color = "black",
    ...rest
  } = props; //definiujemy defaultowe wartosci propsow

  let [fontsLoaded] = useFonts({
    //wczytujemy fonty

    "OpenSans-Regular": require("../assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
    "OpenSans-Light": require("../assets/fonts/Open_Sans/OpenSans-Light.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik/static/Rubik-Medium.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik/static/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("../assets/fonts/Rubik/static/Rubik-LightItalic.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text
        style={{
          fontSize: size,
          fontFamily: family,
          color: color,
          textAlign: align,
          fontWeight: bold ? "bold" : "400",
        }}
      >
        {props.children}
      </Text>
    );
  }
}

export default DefText;
