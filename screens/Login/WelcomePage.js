import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { anonymousRegister } from "../../api/firebaseCalls";
import Screen from "../../components/Screen";

export default function WelcomePage({ navigation }) {
  const handleAnonymousSignIn = () => {
    anonymousRegister();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <LottieView
          style={{
            position: "absolute",
            width: "100%",
            height: 400,
            backgroundColor: "#fff",
          }}
          source={require("../../assets/LottieFiles/confetti.json")}
          autoPlay
          loop

          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <Image source={require("../../img/logo.png")}></Image>
        <Text style={styles.logoHeader}>
          Czytaj, zapisuj i dziel się z innymi!
        </Text>
        <TouchableOpacity style={styles.googleButton} color="dodgerblue">
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
          <Text>Log in with e-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUpEmail")}>
          <Text>Sign up with e-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnonymousSignIn()}>
          <Text style={styles.skipButtonText}>Sign in anonymously</Text>
        </TouchableOpacity>
      </View>
    </Screen>
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
    backgroundColor: "#B58B8B",
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
