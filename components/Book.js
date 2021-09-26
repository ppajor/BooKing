import React, { useEffect, useState } from "react";
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { removeFirebase } from "../api/firebaseCalls";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import DefText from "./DefText";

function Book({ item, percentage }) {
  const [readPercent, setReadPercent] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setReadPercent(
      Math.floor((item.lastReadPageNumber / item.pageCount) * 100)
    );
  }, []);

  const handleRemove = (id) => {
    removeFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library/toRead/" + id
    );
  };

  const handleBookPress = (book) => {
    navigation.navigate("LibraryBookDetails", { data: book });
  };

  const handleReadNowBookPress = (book) => {
    console.log("PRESS");
    navigation.navigate("CurrentReadBookDetails", {
      data: book,
      bookPercent: readPercent,
    });
  };

  return (
    <View style={styles.bookContainer}>
      <TouchableHighlight onPress={() => handleBookPress(item)}>
        <Image
          style={styles.bookMockup}
          source={{ uri: item.thumbnail }}
        ></Image>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.closeIcon}
        onPress={() => handleRemove(item.id)}
      >
        <AntDesign name="close" size={16} color="white" />
      </TouchableHighlight>
      {percentage && (
        <TouchableOpacity
          style={styles.percentageOverlay}
          onPress={() => handleReadNowBookPress(item)}
        >
          <DefText size={24} color="white">
            {readPercent}%
          </DefText>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Book;

const styles = StyleSheet.create({
  bookContainer: {
    position: "relative",
    width: 75,
    height: 112,
    marginLeft: 10,
    marginRight: 10,
  },
  bookMockup: {
    width: 75,
    height: 112,
  },
  closeIcon: {
    position: "absolute",
    right: 4,
    top: 4,
    zIndex: 4,
  },
  percentageOverlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",

    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    opacity: 0.78,
    zIndex: 2,
  },
});
