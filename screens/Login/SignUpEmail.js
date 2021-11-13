import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, BackHandler } from "react-native";
import firebase from "firebase";
import { registerWithEmail, setFirebase, setFirestore, addCreatedUserData, addCreatedUsername } from "../../api/firebaseCalls";

export default function LoginPage({ navigation }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleSignUp = async () => {
    const result = await registerWithEmail(inputEmail, inputPassword);
    // console.log(result);
    const dataToSet1 = { id: result.user.uid, name: inputEmail, username: inputUsername };
    addCreatedUserData(result.user.uid, dataToSet1);
    const dataToSet2 = { userID: result.user.uid };
    addCreatedUsername(inputUsername, dataToSet2);
  };

  return (
    <View style={styles.container}>
      <Image width="50" style={styles.logo} source={require("../../img/logo.png")}></Image>

      <TextInput style={[styles.input, styles.margin]} placeholder="E-mail" value={inputEmail} onChangeText={(text) => setInputEmail(text)} />
      <TextInput style={styles.input} placeholder="Username" value={inputUsername} onChangeText={(text) => setInputUsername(text)} />
      <TextInput style={styles.input} placeholder="Password" value={inputPassword} onChangeText={(text) => setInputPassword(text)} />

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpBtn} color="dodgerblue">
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text>{error}</Text>
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
  signUpBtn: {
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
