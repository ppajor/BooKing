import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { anonymousRegister } from "../../api/firebaseCalls";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";

export default function WelcomePage({ navigation }) {
  const handleAnonymousSignIn = () => {
    anonymousRegister();
    const dataToSet1 = { id: user.uid, name: user.uid, lastRead: [], type: "anonymous", username: user.uid };
    addCreatedUserData(user.uid, dataToSet1);
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
        <Image source={require("../../img/logo2.png")}></Image>
        <View style={{ marginTop: 10 }}>
          <DefText size={14} color="#979797">
            Czytaj, zapisuj i dziel się z innymi!
          </DefText>
        </View>

        <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.push("LoginPage")}>
          <DefText size={14} color="#fff">
            Zaloguj się
          </DefText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.push("SignUpEmail")}>
          <DefText size={14} color="#B58B8B">
            Zarejestruj się
          </DefText>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 48 }} onPress={() => handleAnonymousSignIn()}>
          <DefText size={12} color="#ccc">
            Zaloguj anonimowo
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
  signUpBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 8,
    width: "75%",
    paddingVertical: 10,
    backgroundColor: "#B58B8B",
  },
  loginBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "75%",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#B58B8B",
  },
});
