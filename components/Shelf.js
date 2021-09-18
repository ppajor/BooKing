import React from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";

const Shelf = (props) => {
  return (
    <ScrollView style={styles.container} horizontal>
      <ImageBackground
        source={require("../img/wood_texture.jpg")}
        style={styles.bookshelfContainer}
      >
        {props.children}
      </ImageBackground>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    paddingBottom: 10,
    //backgroundCOlor: "#d2d2d2",
  },
});
