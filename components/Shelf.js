import React from "react";
import { StyleSheet, ImageBackground, View, FlatList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DefText from "./DefText";
import BookCover from "./BookCover";
import { global, globalSheet } from "../styles";
import { useNavigation } from "@react-navigation/native";

const Shelf = (props) => {
  const { data = null, name = null, percentage = null, showAll = true } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.shelfLabelContainer}>
        {name && (
          <View style={styles.shelfLabel}>
            <DefText family="Rubik-Medium" size={16} color="rgba(0,0,0,0.9)">
              {name}
            </DefText>
            <View style={{ width: 50, height: 2, backgroundColor: global.primaryColor, marginTop: 4 }}></View>
          </View>
        )}

        {showAll && (
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("AllBooksShelf", { books: Object.values(data) })}>
              <DefText family="OpenSans-LightItalic" color="rgba(28, 28, 28, 0.9)" size={14}>
                Pokaż wszystkie
              </DefText>
            </TouchableOpacity>

            <MaterialIcons style={{ marginLeft: 2 }} name="arrow-forward-ios" size={14} color="rgba(227, 227, 227, 0.9)" />
          </View>
        )}
      </View>

      <View style={[styles.bookContainer, globalSheet.shadowPrimary]}>
        {data && (
          <View style={styles.book}>
            <FlatList
              horizontal
              data={Object.values(data)}
              renderItem={({ item }) => <BookCover item={item} shelfName={name} percentage={percentage} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        <View style={styles.brownBarContainer}>
          <View style={styles.brownBar}></View>
        </View>
      </View>
    </View>
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
    flex: 1,
    padding: 16,
  },
  shelfLabelContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  bookContainer: {
    justifyContent: "flex-end",
    width: "100%",
    height: 150,
    paddingHorizontal: 8,
  },
  brownBarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    height: 10,
    width: "100%",
  },
  brownBar: {
    width: "100%",
    height: 10,
    borderRadius: 8,
    backgroundColor: "#391715",
  },
});
