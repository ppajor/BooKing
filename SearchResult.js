import React from "react";
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

const SearchResult = (props) => {
  const data = props.data.items;
  var img_key = 0;
  var image;
  var cover;

  /*if (data.length == 0) {
    text_no_results = <Text>No results found </Text>;
  }
  */
  return (
    <ScrollView class={{ marginBottom: 200 }}>
      {data
        .filter((el) => {
          if (!el.volumeInfo.hasOwnProperty("authors")) return false;

          return true;
        })
        .map((el) => {
          if (!el.volumeInfo.hasOwnProperty("imageLinks")) {
            //sprawdzamy czy obiekt volumeinfo ma imageLinks
            image = (
              <Image
                key={img_key++}
                source={require("./img/no_cover_book.jpg")}
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

          return (
            <View style={styles.bookrow}>
              <Link to="./bookDetails">
                <TouchableOpacity
                  onPress={() =>
                    // oprocz pathname mozna podac dane i w child componencie odniesc sie do nich -> props.location.state
                    props.history.push({
                      pathname: "/bookDetails",
                      state: {
                        title: el.volumeInfo.title,
                      },
                    })
                  }
                >
                  {image}
                </TouchableOpacity>
              </Link>
              <View style={styles.bookrowTextContainer}>
                <Text key={el.volumeInfo.id} style={styles.title}>
                  {el.volumeInfo.title}
                </Text>
                <Text style={styles.author}>{el.volumeInfo.authors[0]}</Text>
                <Text style={styles.addToLibrary}>Add to My Library</Text>
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
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 5,
  },
  bookrowTextContainer: {
    width: "100%",
  },
  title: {
    width: "100%",
    marginLeft: 16,
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
  },
});
