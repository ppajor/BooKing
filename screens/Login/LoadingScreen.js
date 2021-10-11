import React, { useEffect } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import firebase from "firebase";
import Screen from "../../components/Screen";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.push("Home", { screen: "HomeScreen" });
      } else {
        navigation.push("WelcomePage");
      }
    });
  });

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          style={{
            width: 250,
            height: 250,
          }}
          source={require("../../assets/LottieFiles/stack-of-books.json")} //conditionale robimy poza sourcem bo inaczej nie działa
          loop
          autoPlay
        />
      </View>
    </Screen>
  );
};

export default LoadingScreen;
