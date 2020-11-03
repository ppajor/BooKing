import React, { useState } from "react";
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

export default function Library(props) {
  // wrap scrollview in view! inaczej sie style pierdola nie wiem czemu
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
            {props.myLibrary.map((book) => {
              return (
                <TouchableHighlight key={book.bookID}>
                  <Image
                    style={styles.bookMockup}
                    source={{ uri: book.bookImg }}
                  ></Image>
                </TouchableHighlight>
              );
            })}
          </ImageBackground>
        </ScrollView>
      </View>
    </>
  );
}

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
    height: 100,
    marginLeft: 10,
    marginRight: 10,
  },
});
