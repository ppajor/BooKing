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
const Library = (props) => {
  const [dataLibrary, setDataLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  // wrap scrollview in view! inaczej sie style pierdola nie wiem czemu
  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/library")
      .once("value")
      .then((snapshot) => {
        let data = Object.values(snapshot.val());
        setDataLibrary(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Text>YOUR Bookshelf</Text>
      <View>
        <ScrollView style={styles.container} horizontal>
          <ImageBackground
            source={require("./img/wood_texture.jpg")}
            style={styles.bookshelfContainer}
          >
            <View style={styles.bookshelf}></View>
            {!loading &&
              dataLibrary.map((book) => {
                return (
                  <TouchableHighlight key={book.bookID}>
                    <Image
                      style={styles.bookMockup}
                      source={{ uri: book.thumbnail }}
                    ></Image>
                  </TouchableHighlight>
                );
              })}
          </ImageBackground>
        </ScrollView>
      </View>
    </>
  );
};

export default Library;

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
});

/* COMMENTS */

// musimy ustawic loading (poczekac az wczytaja sie dane z API/bazy) bo inaczej render bedzie chcial wyswielić danych ktoeych nie ma, w tym przypadku przy dataLibrary.map
