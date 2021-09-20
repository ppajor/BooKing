import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ImagePropTypes,
} from "react-native";
import { Redirect, Link } from "react-router-native";
import firebase from "firebase";

export default function WelcomePage(props) {
  emailOnPress = () => {
    console.log("PRESSED");
  };

  handleAnonymousSignIn = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("User signed in anonymously");
        // props.history.push("/home");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }
        console.error(error);
      });
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
      <TouchableOpacity onPress={handleAnonymousSignIn}>
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

/*
  //const [redirect, setRedirect] = useState(false),
    emailOnPress = () => {
      console.log("PRESSED");
    };

  skipOnPress = () => {
    setRedirect(true);
  };

  return (
    <>
      <Redirect to="/home" />

      <View style={styles.container}>
        <Image source={require("./img/logo.png")}></Image>
        <Text style={styles.logoHeader}>
          Czytaj, zapisuj i dziel się z innymi!
        </Text>
        <TouchableOpacity style={styles.googleButton} color="dodgerblue">
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={emailOnPress}>
          <Text>Sign in with e-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={skipOnPress}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}*/
