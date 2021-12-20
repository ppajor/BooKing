import React from "react";
import { StyleSheet, ImageBackground, View, FlatList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DefText from "./DefText";
import BookCover from "./BookCover";
import { global } from "../styles";
import { useNavigation } from "@react-navigation/native";

const Shelf = (props) => {
  const { data = null, name = null, percentage = null } = props;

  const navigation = useNavigation();

  return (
    <>
      <View style={[styles.container, !name && styles.noHeader]}>
        <ImageBackground source={require("../img/wood_texture.jpg")} style={styles.bookshelfContainer}></ImageBackground>
        <View style={styles.bookshelf}></View>

        {name && (
          <View style={styles.refreshIcon}>
            <DefText family="Rubik-Medium" size={16} color="#fff">
              {name}
            </DefText>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.navigate("AllBooksShelf", { books: Object.values(data) })}>
                <DefText family="OpenSans-LightItalic" color="rgba(227, 227, 227, 0.9)" size={14}>
                  Pokaż wszystkie
                </DefText>
              </TouchableOpacity>

              <MaterialIcons style={{ marginLeft: 2 }} name="arrow-forward-ios" size={14} color="rgba(227, 227, 227, 0.9)" />
            </View>
          </View>
        )}
        {data && (
          <View style={styles.booksContainer}>
            <FlatList
              horizontal
              data={Object.values(data)}
              renderItem={({ item }) => <BookCover item={item} shelfName={name} percentage={percentage} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Shelf;

Shelf.propTypes = {
  data: PropTypes.array, //data z ksiazkami ktore beda w shelfie
  name: PropTypes.string, //nazwa polki by mozna bylo odrozniac parametry
  percentage: PropTypes.bool, //dodatkowy prop by dodać percentage overlay
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 185,
    borderWidth: 2,
  },
  noHeader: {
    height: 160,
  },
  bookshelfContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    //backgroundCOlor: "#d2d2d2",
  },
  bookshelf: {
    position: "absolute",

    bottom: 0,
    width: "100%",
    height: 10,
    backgroundColor: "#391715",
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
  refreshIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 16,
    left: global.padding,
    width: "92%",
    right: 36,
    zIndex: 4,
  },
});
