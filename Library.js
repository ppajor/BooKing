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

const Library = (props) => {
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
      });
  }, []);

  return (
    <>
      {!loading && (
        <ShelfRouter
          dataLibrary={dataLibrary}
          title="Do przeczytania:"
          percentage={false}
        />
      )}
      {!loading && (
        <ShelfRouter
          dataLibrary={dataLibrary}
          title="Czytane:"
          percentage={true}
        />
      )}
      {!loading && (
        <ShelfRouter
          dataLibrary={dataLibrary}
          title="Przeczytane:"
          percentage={false}
        />
      )}
    </>
  );
};

export default withRouter(Library);

const Shelf = (props) => {
  return (
    <>
      <Text>{props.title}</Text>
      <View>
        <ScrollView style={styles.container} horizontal>
          <ImageBackground
            source={require("./img/wood_texture.jpg")}
            style={styles.bookshelfContainer}
          >
            <View style={styles.bookshelf}></View>
            {props.dataLibrary.map((book) => {
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
                  {props.percentage && (
                    <View style={styles.readPercentage}>
                      <Text style={styles.readPercentageText}>0%</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ImageBackground>
        </ScrollView>
      </View>
    </>
  );
};

const ShelfRouter = withRouter(Shelf); //tworzymy ten sam komponent jak shelf ale z withRouterem zeby porzystac z props.push.history

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
