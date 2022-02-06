import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, BackHandler } from "react-native";
import firebase from "firebase";
import DefText from "../../components/DefText";

export default function LoginPage({ navigation }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(null);

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
        setError("Nieprawidłowy e-mail lub hasło");
      });
  };

  return (
    <View style={styles.container}>
      <Image width="50" style={styles.logo} source={require("../../img/logo2.png")}></Image>

      <TextInput style={[styles.input, styles.margin]} placeholder="E-mail" onChangeText={(text) => setInputUsername(text)} value={inputUsername} />
      <TextInput style={styles.input} placeholder="Hasło" secureTextEntry={true} onChangeText={(text) => setInputPassword(text)} value={inputPassword} />
      <TouchableOpacity style={styles.loginButton} color="dodgerblue" onPress={handleLogin}>
        <DefText size={14} color="#fff">
          Zaloguj się
        </DefText>
      </TouchableOpacity>
      {error && (
        <DefText size={14} color="red">
          {error}
        </DefText>
      )}
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
    backgroundColor: "#f8f8f8",
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
    backgroundColor: "#fff",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 8,
    width: "75%",
    paddingVertical: 10,
    backgroundColor: "#B58B8B",
  },
  loginButtonText: {
    color: "#fff",
  },
});
