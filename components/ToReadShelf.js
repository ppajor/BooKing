import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { withRouter } from "react-router-native";
import Shelf from "./Shelf.js";

const ToReadShelf = (props) => {
  const [dataLibrary, setDataLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteState, setDeleteState] = useState(false);
  // wrap scrollview in view! inaczej sie style pierdola nie wiem czemu
  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/library/toRead")
      .once("value")
      .then((snapshot) => {
        let data = Object.values(snapshot.val()); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
        setDataLibrary(data);
        setLoading(false);
        //console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.refresh, deleteState]); //aktualizuj pobierane dane po dodaniu ksiazki do polki badz po jej usunieciu

  const deleteBook = (id) => {
    firebase
      .database()
      .ref(
        "/users/" + firebase.auth().currentUser.uid + "/library/toRead/" + id
      )
      .remove();

    setDeleteState((oldState) => !oldState);
  };

  const handleBookPress = (book) => {
    props.history.push({
      pathname: "/libraryBookDetails",
      state: {
        data: book,
      },
    });
  };

  return (
    <>
      {!loading && (
        <>
          <Text>Do przeczytania</Text>
          <View>
            <Shelf>
              <View style={styles.bookshelf}></View>
              {dataLibrary.map((book) => {
                return (
                  <View style={styles.bookContainer} key={book.id}>
                    <TouchableHighlight onPress={() => handleBookPress(book)}>
                      <Image
                        style={styles.bookMockup}
                        source={{ uri: book.thumbnail }}
                      ></Image>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => deleteBook(book.id)}
                      style={styles.closeIcon}
                    >
                      <AntDesign name="close" size={16} color="white" />
                    </TouchableHighlight>
                  </View>
                );
              })}
            </Shelf>
          </View>
        </>
      )}
    </>
  );
};

export default withRouter(ToReadShelf);

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderWidth: 2,
  },
  bookshelfContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    paddingBottom: 10,
    //backgroundCOlor: "#d2d2d2",
  },
  bookshelf: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 10,
    backgroundColor: "#5b1b09",
  },

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
  readPercentage: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#000",
    zIndex: 2,
    width: 75,
    height: 112,
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.78,
  },
  readPercentageText: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  },
  closeIcon: {
    position: "absolute",
    right: 4,
    top: 4,
  },
});

/* COMMENTS */

// musimy ustawic loading (poczekac az wczytaja sie dane z API/bazy) bo inaczej render bedzie chcial wyswielić danych ktoeych nie ma, w tym przypadku przy dataLibrary.map

// musimy wyeksportowac komponent z withRouter bo inaczej props.history push nie zadziała
