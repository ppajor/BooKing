import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from "react-native";
import firebase from "firebase";
import { globalSheet, global } from "../styles";
import DefText from "./DefText";
import { getFirebase } from "../api/firebaseCalls";

const LastRead = ({ book, id }) => {
  const [lastReadBook, setLastReadBook] = useState(null);
  const [bookPercent, setBookPercent] = useState(0);
  const [wikusia, setWikusia] = useState(false);

  const getLastRead = async () => {
    let bookPercentage = Math.floor(
      (book.lastReadPageNumber / book.pageCount) * 100
    );
    setBookPercent(bookPercentage);
    setLastReadBook(book);
  };

  useEffect(() => {
    getLastRead();
  }, []);

  return (
    <>
      {lastReadBook ? (
        <View>
          <View
            style={{
              marginBottom: 0,
              paddingLeft: global.padding,
            }}
          >
            <DefText
              family="Rubik-Medium"
              size={16}
              color=" rgba(36, 36, 36, 0.9)"
            >
              Ostatnio czytana
            </DefText>
          </View>
          <View>
            <View style={styles.container}>
              <Image
                style={styles.bookMockup}
                source={{ uri: lastReadBook.thumbnail }}
              ></Image>
              <TouchableHighlight style={styles.readPercentage}>
                <View>
                  <DefText size={24} color="#fff" align="center">
                    {bookPercent}%
                  </DefText>
                </View>
              </TouchableHighlight>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View
                    style={{ marginBottom: 4, paddingRight: global.padding }}
                  >
                    <DefText family="Rubik-Regular" size={16}>
                      {lastReadBook.title}
                    </DefText>
                  </View>

                  <DefText family="OpenSans-LightItalic" size={14}>
                    {lastReadBook.authors}
                  </DefText>
                </View>
                {wikusia && (
                  <TouchableHighlight style={styles.readBtn}>
                    <DefText
                      family="OpenSans-LightItalic"
                      size={14}
                      color="#fff"
                    >
                      Czytaj dalej
                    </DefText>
                  </TouchableHighlight>
                )}
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
    marginTop: 24,
  },
  bookMockup: {
    width: 90,
    height: 134,
    marginHorizontal: 24,
  },
  readPercentage: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    width: 90,
    height: 134,
    backgroundColor: "#000",
    zIndex: 2,
    marginHorizontal: 24,
    opacity: 0.78,
  },

  readBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingVertical: 5,
    backgroundColor: global.primaryColor,
  },
});

export default LastRead;
