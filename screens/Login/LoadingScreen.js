import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import firebase from "firebase";

const LoadingScreen = ({ navigation }) => {
  const [userLogged, setUserLogged] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("WelcomePage");
      }
    });
  });

  return <Text>Loading screen</Text>;
};

export default LoadingScreen;
