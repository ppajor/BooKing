import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from "react-native";
import firebase from "firebase";
import global from "../styles";
import DefText from "./DefText";
import { getFirebase } from "../api/firebaseCalls";

const LastRead = (props) => {
  const [lastReadBook, setLastReadBook] = useState(null);
  const [bookPercent, setBookPercent] = useState(0);

  const getLastRead = async () => {
    const data = await getFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library"
    );

    if (data.lastRead) {
      let lastread = data.lastRead;
      let book = data.readNow[lastread];
      let bookPercentage = Math.floor(
        (data.readNow[lastread].lastReadPageNumber /
          data.readNow[lastread].pageCount) *
          100
      );
      setBookPercent(bookPercentage);
      setLastReadBook(book);
    }
  };

  useEffect(() => {
    getLastRead();
  }, []);

  return (
    <>
      {lastReadBook && (
        <>
          <View style={{ marginBottom: 8 }}>
            <DefText>Ostatnio czytana</DefText>
          </View>
          <>
            <View style={styles.container}>
              <Image
                style={styles.bookMockup}
                source={{ uri: lastReadBook.thumbnail }}
              ></Image>
              <TouchableHighlight style={styles.readPercentage}>
                <View>
                  <Text style={styles.readPercentageText}>{bookPercent}%</Text>
                </View>
              </TouchableHighlight>
              <Text>{lastReadBook.title}</Text>
              <TouchableHighlight style={global.primaryBtn}>
                <Text style={{ color: "#fff" }}>Czytaj dalej</Text>
              </TouchableHighlight>
            </View>
          </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
  },
  bookMockup: {
    width: 90,
    height: 134,
    marginLeft: 10,
    marginRight: 10,
  },
  readPercentage: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#000",
    zIndex: 2,
    width: 90,
    height: 134,
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.78,
  },
  readPercentageText: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  },
  readBtn: {
    position: "absolute",
    bottom: 0,
    right: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 95,
    height: 34,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "dodgerblue",
  },
});

export default LastRead;
