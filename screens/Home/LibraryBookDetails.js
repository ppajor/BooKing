import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image,
  TouchableHighlight,
} from "react-native";

import firebase from "firebase";

export default function LibraryBookDetails(props) {
  var image;

  if (props.location.state.data.thumbnail) {
    image = (
      <Image
        source={{ uri: props.location.state.data.thumbnail }}
        style={{ width: 100, height: 150 }}
      />
    );
  } else {
    image = (
      <Image
        source={require("../../img/no_cover_book.jpg")}
        style={{ width: 75, height: 100 }}
      />
    );
  }

  useEffect(() => {
    const backAction = () => {
      props.history.push("/Home"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu trzeba posprzątac
  }, []);

  const handleAddReadNow = (el) => {
    console.log("Jestem w handleAddReadNow!");
    console.log(el);
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/library/readNow/") //musimy zautoryzowac usera bo inaczej bedzie przypal i dane zapisze w undefined zamiast w ID usera tak jak chcemy
      .update({
        [el.id]: {
          id: el.id,
          title: el.title,
          thumbnail: el.thumbnail,
          pageCount: el.pageCount,
          lastReadPageNumber: 1,
        },
      })
      .then(() => {
        // nested promise ?????
        console.log("Data updated.");

        firebase
          .database()
          .ref(
            "/users/" +
              firebase.auth().currentUser.uid +
              "/library/toRead/" +
              el.id
          )
          .remove(); // promise??? handle then/catch ?????
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ marginTop: 50 }}>
      <View style={styles.container}>
        {image}
        <View style={{ flex: 1 }}>
          <Text>{props.location.state.data.title} </Text>
          <TouchableHighlight
            style={styles.readBtn}
            onPress={() => handleAddReadNow(props.location.state.data)}
          >
            <Text style={styles.readBtnText}>Czytaj</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  readBtn: {
    position: "absolute",
    bottom: 0,
    right: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 34,
    backgroundColor: "dodgerblue",
  },
  readBtnText: {
    color: "#fff",
  },
});

//comments

// trzeba w onpressach dawać {() => function} zamiast {function} inaczej odpala od razu
