import React from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import DefText from "./DefText";
import Book from "./Book";

const Shelff = ({ data, name, percentage = null }) => {
  return (
    <>
      <DefText>{name}</DefText>

      <View style={styles.container}>
        <ImageBackground
          source={require("../img/wood_texture.jpg")}
          style={styles.bookshelfContainer}
        ></ImageBackground>
        <View style={styles.bookshelf}></View>

        <View style={styles.booksContainer}>
          <FlatList
            horizontal
            data={Object.values(data)}
            renderItem={({ item }) => (
              <Book item={item} percentage={percentage} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
};

export default Shelff;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    borderWidth: 2,
  },
  bookshelfContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
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
  booksContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "relative",
    width: "100%",
    height: "100%",
    paddingBottom: 10,
  },
});
