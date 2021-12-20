import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, TouchableHighlight, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { globalSheet, global } from "../styles";
import DefText from "./DefText";
import { getFirebase, getLastReadBook } from "../api/firebaseCalls";
import { useNavigation } from "@react-navigation/native";

const LastRead = ({ book, id }) => {
  const [lastReadBook, setLastReadBook] = useState(null);
  const [bookPercent, setBookPercent] = useState(0);
  const [wikusia, setWikusia] = useState(false);

  const navigation = useNavigation();

  const getLastRead = async () => {
    const book = await getLastReadBook(id);
    if (book) {
      setLastReadBook(book);
      let bookPercentage = Math.floor((book.lastReadPageNumber / book.pageCount) * 100);
      setBookPercent(bookPercentage);
    }
  };

  useEffect(() => {
    getLastRead();
  }, []);

  const handleBookClick = () => {
    navigation.push("LibraryBookDetails", {
      data: lastReadBook,
      name: "Czytaj teraz!",
      bookPercent: bookPercent,
    });
  };

  return (
    <>
      {lastReadBook ? (
        <View style={[styles.mainContainer, globalSheet.shadowPrimary]}>
          <View
            style={{
              marginBottom: 16,
              paddingLeft: global.padding,
            }}
          >
            <DefText family="Rubik-Medium" size={16} color={global.textColor}>
              Ostatnio czytana
            </DefText>
            <View style={{ width: "15%", height: 2, backgroundColor: global.primaryColor, marginTop: 4 }}></View>
          </View>
          <TouchableOpacity onPress={() => handleBookClick()}>
            <View style={styles.container}>
              <Image style={styles.bookMockup} source={{ uri: lastReadBook.thumbnail }}></Image>
              <TouchableHighlight style={styles.readPercentage}>
                <View>
                  <DefText size={28} color="#fff" align="center">
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
                  <View style={{ marginBottom: 4, paddingRight: global.padding }}>
                    <DefText family="Rubik-Regular" size={16}>
                      {lastReadBook.title}
                    </DefText>
                  </View>

                  <DefText family="OpenSans-LightItalic" size={14}>
                    {lastReadBook.authors}
                  </DefText>
                </View>
                <TouchableHighlight onPress={() => handleBookClick()} style={styles.readBtn}>
                  <DefText family="OpenSans-LightItalic" size={14} color="#fff">
                    Czytaj dalej
                  </DefText>
                </TouchableHighlight>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 36,
    marginTop: 0,
    paddingTop: 16,
    borderRadius: 16,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
    marginTop: 12,
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
