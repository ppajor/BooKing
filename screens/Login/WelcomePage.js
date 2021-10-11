import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { anonymousRegister } from "../../api/firebaseCalls";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";

export default function WelcomePage({ navigation }) {
  const handleAnonymousSignIn = () => {
    anonymousRegister();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <LottieView
          style={styles.lottie}
          source={require("../../assets/LottieFiles/confetti.json")}
          autoPlay
          loop

          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <Image source={require("../../img/logo.png")}></Image>
        <View style={{ marginTop: 10 }}>
          <DefText size={14} color="#979797">
            Czytaj, zapisuj i dziel się z innymi!
          </DefText>
        </View>
        <TouchableOpacity style={styles.googleButton} color="dodgerblue">
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
          <DefText size={14}>Log in with e-mail</DefText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUpEmail")}>
          <DefText size={14}>Sign up with e-mail</DefText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 48 }}
          onPress={() => handleAnonymousSignIn()}
        >
          <DefText size={12} color="#ccc">
            Sign in anonymously
          </DefText>
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
  lottie: {
    position: "absolute",
    width: "100%",
    height: 400,
    backgroundColor: "#fff",
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
});
