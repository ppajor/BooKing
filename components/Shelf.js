import React from "react";
import { StyleSheet, ImageBackground, View, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DefText from "./DefText";
import BookCover from "./BookCover";
import { global } from "../styles";

const Shelf = (props) => {
  const { data = null, name = null, percentage = null } = props;

  return (
    <>
      <View style={[styles.container, !name && styles.noHeader]}>
        <ImageBackground source={require("../img/wood_texture.jpg")} style={styles.bookshelfContainer}></ImageBackground>
        <View style={styles.bookshelf}></View>

        {name && (
          <View style={styles.refreshIcon}>
            <DefText family="Rubik-Medium" size={16} color="rgba(227, 227, 227, 0.9)">
              {name}
            </DefText>
            <TouchableOpacity onPress={() => props.refresh()}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <DefText family="OpenSans-Light" color="rgba(227, 227, 227, 0.75)">
                  refresh
                </DefText>
                <MaterialCommunityIcons name="reload" size={16} color="#e3e3e3" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {data && (
          <View style={styles.booksContainer}>
            <FlatList
              horizontal
              data={Object.values(data)}
              renderItem={({ item }) => <BookCover item={item} shelfName={name} percentage={percentage} removeRefresh={props.refresh} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
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
