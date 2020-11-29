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

const ToReadShelf = (props) => {
  const [dataLibrary, setDataLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  // wrap scrollview in view! inaczej sie style pierdola nie wiem czemu
  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/library/toRead")
      .once("value")
      .then((snapshot) => {
        let data = Object.values(snapshot.val());
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
          <Text>Do przeczytania</Text>
          <View>
            <ScrollView style={styles.container} horizontal>
              <ImageBackground
                source={require("./img/wood_texture.jpg")}
                style={styles.bookshelfContainer}
              >
                <View style={styles.bookshelf}></View>
                {dataLibrary.map((book) => {
                  return (
                    <View style={styles.bookContainer} key={book.id}>
                      <TouchableHighlight
                        onPress={() =>
                          props.history.push({
                            pathname: "/libraryBookDetails",
                            state: {
                              data: book,
                            },
                          })
                        }
                      >
                        <Image
                          style={styles.bookMockup}
                          source={{ uri: book.thumbnail }}
                        ></Image>
                      </TouchableHighlight>
                    </View>
                  );
                })}
              </ImageBackground>
            </ScrollView>
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
