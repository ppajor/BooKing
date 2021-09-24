import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import { anonymousRegister } from "../../api/firebaseCalls";

export default function WelcomePage(props) {
  const handleAnonymousSignIn = () => {
    anonymousRegister();
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../img/logo.png")}></Image>
      <Text style={styles.logoHeader}>
        Czytaj, zapisuj i dziel się z innymi!
      </Text>
      <TouchableOpacity style={styles.googleButton} color="dodgerblue">
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <Link to="./login">
        <Text>Log in with e-mail</Text>
      </Link>
      <Link to="./signupEmail">
        <Text>Sign up with e-mail</Text>
      </Link>
      <TouchableOpacity onPress={() => handleAnonymousSignIn()}>
        <Text style={styles.skipButtonText}>Sign in anonymously</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: "50%",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  logoHeader: {
    color: "#979797",
    fontSize: 14,
    marginTop: 10,
  },

  googleButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
    width: "75%",
    height: 35,
    backgroundColor: "dodgerblue",
  },

  googleButtonText: {
    color: "#fff",
  },
  skipButtonText: {
    marginTop: 48,

    fontSize: 12,
    color: "#ccc",
  },
});
