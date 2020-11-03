import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import firebase from "firebase";

const LoadingScreen = (props) => {
  const [userLogged, setUserLogged] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.history.push("/home");
      } else {
        props.history.push("/chooseLoginVariant");
      }
    });
  });

  return <Text>Loading screen</Text>;
};

export default LoadingScreen;
