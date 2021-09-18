import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { withRouter, Link } from "react-router-native";
import firebase from "firebase";

const SearchResult = (props) => {
  const data = props.data.items;
  var img_key = 0;
  var image;

  useEffect(() => {
    console.log("RENDER");
  }, []);

  const checkThumbnailsExist = (el) => {
    if (!el.volumeInfo.hasOwnProperty("imageLinks")) {
      //sprawdzamy czy obiekt volumeinfo ma imageLinks
      image = (
        <Image
          key={img_key++}
          source={require("../img/no_cover_book.jpg")}
          style={{ width: 75, height: 100 }}
        />
      );
    } else {
      image = (
        <Image
          key={img_key++}
          source={{ uri: el.volumeInfo.imageLinks.thumbnail }}
          style={{ width: 75, height: 100 }}
        />
      );
    }
  };

  const handleAddToLibrary = (el) => {
    console.log("Jestem tu!");
    for (let key in el) {
      console.log(key, el[key]);
    }

    if (typeof el.volumeInfo.pageCount == "undefined") {
      el.volumeInfo.pageCount = 0;
    }

    firebase
      .database()
      .ref("/users/" + props.currentUserUID + "/library/toRead/")
      .update({
        [el.id]: {
          id: el.id,
          title: el.volumeInfo.title,
          thumbnail: el.volumeInfo.imageLinks.thumbnail,
          pageCount: el.volumeInfo.pageCount,
          lastReadPageNumber: 1,
        },
      })
      .then(() => {
        console.log("Data updated.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*if (data.length == 0) {
    text_no_results = <Text>No results found </Text>;
  }
  */
  return (
    <ScrollView class={{ marginBottom: 200 }}>
      {data
        .filter((el) => {
          //console.log(el.volumeInfo.imageLinks.thumbnail);
          if (!el.volumeInfo.hasOwnProperty("authors")) return false;

          if (!el.volumeInfo.hasOwnProperty("description")) {
            el.volumeInfo.description = "No description";
          }

          return true;
        })
        .map((el) => {
          checkThumbnailsExist(el);

          return (
            <View style={styles.bookrow} key={el.id}>
              <TouchableOpacity
                onPress={() =>
                  // oprocz pathname mozna podac dane i w child componencie odniesc sie do nich -> props.location.state
                  props.history.push({
                    pathname: "/bookDetails",
                    state: {
                      title: el.volumeInfo.title,
                      cover: el.volumeInfo.imageLinks.thumbnail,
                      description: el.volumeInfo.description,
                    },
                  })
                }
              >
                {image}
              </TouchableOpacity>
              <View style={styles.bookrowTextContainer}>
                <Text style={styles.title}>{el.volumeInfo.title}</Text>
                <Text style={styles.author}>{el.volumeInfo.authors[0]}</Text>
                <TouchableOpacity
                  style={styles.addToLibrary}
                  onPress={() => {
                    handleAddToLibrary(el);
                    props.addNew();
                  }}
                >
                  <Text>Add to My Library</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default withRouter(SearchResult);

const styles = StyleSheet.create({
  bookrow: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  bookrowTextContainer: {
    width: "100%",
  },
  title: {
    width: "100%",
    marginLeft: 16,
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    overflow: "hidden",
  },
  author: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 14,
    fontWeight: "400",
    color: "#d2d2d2",
    overflow: "hidden",
  },
  addToLibrary: {
    position: "absolute",
    right: 85,
    bottom: 4,
    fontSize: 12,
    zIndex: 999,
  },
});

/* COMMENTS */

// Touchable opacity powinien miec style najpierw, pozniej childy

// Musimy wyeksportowac komponent z withRouter bo inaczej props.history push nie zadziała
