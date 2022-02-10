import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, BackHandler } from "react-native";
import firebase from "firebase";
import { registerWithEmail, setFirebase, setFirestore, addCreatedUserData, addCreatedUsername } from "../../api/firebaseCalls";

export default function LoginPage({ navigation }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordRepeat, setInputPasswordRepeat] = useState("");
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
    if (inputPassword === inputPasswordRepeat) {
      const result = await registerWithEmail(inputEmail, inputPassword);
      // console.log(result);
      if (typeof result == "string") {
        setError(result);
      } else {
        const dataToSet1 = { id: result.user.uid, name: inputEmail, lastRead: [], username: inputUsername };
        addCreatedUserData(result.user.uid, dataToSet1);
        const dataToSet2 = { userID: result.user.uid };
        addCreatedUsername(inputUsername, dataToSet2);
      }
    } else {
      setError("Hasła nie zgadzają się");
    }
  };

  return (
    <View style={styles.container}>
      <Image width="50" style={styles.logo} source={require("../../img/logo2.png")}></Image>

      <TextInput style={[styles.input, styles.margin]} placeholder="E-mail" value={inputEmail} onChangeText={(text) => setInputEmail(text)} />
      <TextInput style={styles.input} placeholder="Nazwa użytkownika" value={inputUsername} onChangeText={(text) => setInputUsername(text)} />
      <TextInput style={styles.input} placeholder="Hasło" value={inputPassword} secureTextEntry={true} onChangeText={(text) => setInputPassword(text)} />
      <TextInput
        style={styles.input}
        placeholder="Powtórz hasło "
        value={inputPasswordRepeat}
        secureTextEntry={true}
        onChangeText={(text) => setInputPasswordRepeat(text)}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpBtn} color="dodgerblue">
        <Text style={styles.loginButtonText}>Zarejestruj się</Text>
      </TouchableOpacity>
      <Text style={{ color: "red" }}>{error}</Text>
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
