import React from "react";
import { StyleSheet, ScrollView, ImageBackground, View } from "react-native";

const Shelf = (props) => {
  return (
    <ScrollView style={styles.container} horizontal>
      <ImageBackground
        source={require("../img/wood_texture.jpg")}
        style={styles.bookshelfContainer}
      ></ImageBackground>
      <View style={styles.booksContainer}>{props.children}</View>
    </ScrollView>
  );
};

export default Shelf;

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderWidth: 2,
  },
  bookshelfContainer: {
    position: "absolute",
    width: "100%",
    height: 150,
    paddingBottom: 10,
    //backgroundCOlor: "#d2d2d2",
  },
  booksContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
});
