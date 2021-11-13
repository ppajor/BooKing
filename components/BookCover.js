import React, { useEffect, useState } from "react";
import { View, TouchableHighlight, Image, StyleSheet, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { removeFirebase, getFirebase, removeReadNowBook, removeToReadBook, getLastReadID, removeLastReadID } from "../api/firebaseCalls";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import DefText from "./DefText";

function BookCover({ item, shelfName, percentage, ...props }) {
  const [readPercent, setReadPercent] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setReadPercent(Math.floor((item.lastReadPageNumber / item.pageCount) * 100));
  }, []);

  const handleRemove = async (id, name) => {
    if (name == "Do przeczytania") {
      await removeToReadBook(id);
    }
    if (name == "Czytane teraz") {
      //const lastreadID = await getLastReadID();
      removeLastReadID(id);

      //await removeFirebase("/users/" + firebase.auth().currentUser.uid + "/library/readNow/" + id);
      removeReadNowBook(id);
    }
  };

  const handleBookPress = (book, name) => {
    if (name == "Do przeczytania") {
      navigation.push("LibraryBookDetails", {
        data: book,
        name: "Czytaj",
      });
    }
    if (name == "Czytane teraz") {
      navigation.push("LibraryBookDetails", {
        data: book,
        name: "Czytaj teraz!",
        bookPercent: readPercent,
      });
    }
    if (name == null) {
      navigation.push("LibraryBookDetails", {
        data: book,
        name: "Dodaj do biblioteki",
      });
    }
  };

  return (
    <View style={styles.bookContainer}>
      <TouchableHighlight onPress={() => handleBookPress(item, shelfName)}>
        <Image style={styles.bookMockup} source={{ uri: item.thumbnail }}></Image>
      </TouchableHighlight>
      {shelfName != null && (
        <TouchableHighlight
          style={styles.closeIcon}
          onPress={() => {
            handleRemove(item.id, shelfName);
          }}
        >
          <AntDesign name="close" size={16} color="white" />
        </TouchableHighlight>
      )}

      {percentage && (
        <TouchableOpacity style={styles.percentageOverlay} onPress={() => handleBookPress(item, shelfName)}>
          <DefText size={24} color="white">
            {readPercent}%
          </DefText>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default BookCover;

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
