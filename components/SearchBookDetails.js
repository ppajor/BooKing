import React from "react";
import { View, Image, StyleSheet } from "react-native";
import DefText from "./DefText";

function SearchBookDetails({ item }) {
  return (
    <View style={styles.foundBookContainer}>
      {item.volumeInfo.imageLinks ? (
        <Image
          style={styles.image}
          source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
        />
      ) : (
        <Image
          source={require("../img/no_cover_book.jpg")}
          style={styles.image}
        />
      )}
      <View style={{ marginBottom: 4 }}>
        <DefText family="OpenSans-SemiBold" size={11} align="center">
          {item.volumeInfo.title}
        </DefText>
      </View>
      <DefText family="Rubik-LightItalic" size={11} align="center">
        {item.volumeInfo.authors[0]}
      </DefText>
    </View>
  );
}

export default SearchBookDetails;

const styles = StyleSheet.create({
  foundBookContainer: {
    display: "flex",
    alignItems: "center",
    width: 125,
    padding: 8,
    margin: 4,
    marginTop: 32,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 60,
    height: 90,
    marginBottom: 8,
  },
});
