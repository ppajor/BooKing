import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import firebase from "firebase";

export default function LoginPage({ navigation }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("WelcomePage"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(inputUsername, inputPassword)
      .then(() => {
        console.log("User logged in");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        width="50"
        style={styles.logo}
        source={require("../../img/logo.png")}
      ></Image>

      <TextInput
        style={[styles.input, styles.margin]}
        placeholder="Username"
        onChangeText={(text) => setInputUsername(text)}
        value={inputUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setInputPassword(text)}
        value={inputPassword}
      />
      <TouchableOpacity
        style={styles.loginButton}
        color="dodgerblue"
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: "30%",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  margin: {
    marginTop: 50,
  },
  input: {
    marginTop: 10,
    width: "75%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    color: "#000",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
    width: "75%",
    height: 35,
    backgroundColor: "#B58B8B",
  },
  loginButtonText: {
    color: "#fff",
  },
});
