import React from "react";
import { StyleSheet, ImageBackground, View, FlatList } from "react-native";
import DefText from "./DefText";
import BookCover from "./BookCover";

const Shelf = ({ data, name = null, percentage = null }) => {
  return (
    <>
      <View style={styles.container}>
        {name && (
          <View style={{ position: "absolute", top: 16, left: 16, zIndex: 4 }}>
            <DefText family="Rubik-Medium" size={16} color="#e3e3e3">
              {name}
            </DefText>
          </View>
        )}
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
              <BookCover item={item} percentage={percentage} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
};

export default Shelf;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 185,
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
