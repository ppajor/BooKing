import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  BackHandler,
} from "react-native";
import PropTypes from "prop-types";
import firebase from "firebase";
import DefText from "../../components/DefText";
import Timer from "../../components/Timer";
import { global } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { updateFirebase, removeFirebase } from "../../api/firebaseCalls";

export default function LibraryBookDetails({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const [timerOn, setTimerOn] = useState(false);

  const handleBtnClick = (buttonName) => {
    if (buttonName == "Dodaj do biblioteki")
      handleAddToLibrary(route.params.data);

    if (buttonName == "Czytaj") handleAddReadNow(route.params.data);

    if (buttonName == "Czytaj teraz!") handleReadNow();
  };

  const handleAddToLibrary = (el) => {
    const dataToUpdate = {
      [el.id]: {
        id: el.id,
        title: el.title,
        authors: el.authors,
        description: el.description,
        thumbnail: el.thumbnail,
        pageCount: el.pageCount,
        lastReadPageNumber: 1,
      },
    };
    updateFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library/toRead/",
      dataToUpdate
    );
    navigation.push("Home");
  };

  const handleAddReadNow = (el) => {
    const dataToUpdate = {
      [el.id]: {
        id: el.id,
        title: el.title,
        authors: el.authors,
        description: el.description,
        thumbnail: el.thumbnail,
        pageCount: el.pageCount,
        lastReadPageNumber: 1,
      },
    };
    updateFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library/readNow/",
      dataToUpdate
    );
    removeFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library/toRead/" + el.id
    );
    navigation.push("Home");
  };

  const handleReadNow = () => {
    setTimerOn(true);
    const dataToUpdate = { lastRead: route.params.data.id };
    updateFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library",
      dataToUpdate
    );
  };

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.headerBody}>
          {route.params.data.thumbnail ? (
            <Image
              source={{ uri: route.params.data.thumbnail }}
              style={{ width: 100, height: 150 }}
            />
          ) : (
            <Image
              source={require("../../img/no_cover_book.jpg")}
              style={{ width: 100, height: 150 }}
            />
          )}
          {typeof route.params.bookPercent == "number" ? (
            <TouchableHighlight style={styles.readPercentage}>
              <View style={styles.readPercentageText}>
                <DefText size={32} color="#fff">
                  {route.params.bookPercent}%
                </DefText>
              </View>
            </TouchableHighlight>
          ) : null}
          <View style={styles.bookPrimaryInfo}>
            <View>
              <View style={{ marginBottom: 4 }}>
                <DefText family="Rubik-Regular" size={16}>
                  {route.params.data.title}
                </DefText>
              </View>

              <DefText family="OpenSans-LightItalic" size={14}>
                {route.params.data.authors}
              </DefText>
            </View>
            <TouchableHighlight
              style={styles.readBtn}
              onPress={() => handleBtnClick(name)}
            >
              <DefText family="OpenSans-LightItalic" size={14} color="#fff">
                {name}
              </DefText>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <DefText family="Rubik-Regular" size={16}>
          Opis książki
        </DefText>
        <View style={styles.separator}></View>
        <DefText
          family="OpenSans-LightItalic"
          size={14}
          color="rgba(0, 0, 0, 0.5)"
        >
          {route.params.data.description}
        </DefText>
      </View>
      {timerOn && <Timer bookID={route.params.data.id} />}
    </ScrollView>
  );
}

LibraryBookDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        pageCount: PropTypes.number.isRequired,
        lastReadPageNumber: PropTypes.number.isRequired,
      }),
    }),
  }),
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "rgba(181, 139, 139, 0.05)",
  },
  bookPrimaryInfo: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 24,
    paddingVertical: 8,
  },
  headerBody: {
    height: 150,
    display: "flex",
    flexDirection: "row",
  },
  readBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: global.primaryColor,
  },

  bodyContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  separator: {
    width: 50,
    height: 2,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: global.primaryColor,
  },

  modalContainer: {
    width: "100%",
    height: 120,
    marginVertical: 24,
    marginHorizontal: 24,
  },
  modalText: {
    color: "#a8a8a8",
  },
  readPercentage: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 150,
    backgroundColor: "#000",
    opacity: 0.78,
    zIndex: 2,
  },
  readPercentageText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});

//comments

// trzeba w onpressach dawać {() => function} zamiast {function} inaczej odpala od razu
