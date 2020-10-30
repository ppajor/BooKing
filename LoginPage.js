import React, { useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";

export default function LoginPage(props) {
  useEffect(() => {
    const backAction = () => {
      props.history.push("/"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  return (
    <View style={styles.container}>
      <Image
        width="50"
        style={styles.logo}
        source={require("./img/logo.png")}
      ></Image>

      <TextInput style={[styles.input, styles.margin]} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" />
      <TouchableOpacity style={styles.loginButton} color="dodgerblue">
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
    backgroundColor: "dodgerblue",
  },
  loginButtonText: {
    color: "#fff",
  },
});
