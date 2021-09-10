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

import firebase from "firebase";
import { withRouter } from "react-router-native";
import Shelf from "./Shelf.js";

const ReadNowShelf = (props) => {
  const [dataLibrary, setDataLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  // wrap scrollview in view! inaczej sie style pierdola
  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/library/readNow")
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
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Text>Czytane:</Text>
          <View>
            <Shelf>
              <View style={styles.bookshelf}></View>
              {dataLibrary.map((book) => {
                let percent = Math.floor(
                  (book.lastReadPageNumber / book.pageCount) * 100
                );
                return (
                  <View style={styles.bookContainer} key={book.id}>
                    <Image
                      style={styles.bookMockup}
                      source={{ uri: book.thumbnail }}
                    ></Image>
                    <TouchableHighlight
                      style={styles.readPercentage}
                      onPress={() =>
                        props.history.push({
                          pathname: "/currentReadBookDetails",
                          state: {
                            data: book,
                            bookPercent: percent,
                          },
                        })
                      }
                    >
                      <View>
                        <Text style={styles.readPercentageText}>
                          {percent}%
                        </Text>
                      </View>
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

export default withRouter(ReadNowShelf);

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
  bookMockup: {
    width: 75,
    height: 112,
    marginLeft: 10,
    marginRight: 10,
  },
  bookContainer: {
    position: "relative",
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
});

/* COMMENTS */

// musimy ustawic loading (poczekac az wczytaja sie dane z API/bazy) bo inaczej render bedzie chcial wyswielić danych ktoeych nie ma, w tym przypadku przy dataLibrary.map

// musimy wyeksportowac komponent z withRouter bo inaczej props.history push nie zadziała
