import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PropTypes from "prop-types";
import firebase from "firebase";
import DefText from "../../components/DefText";
import Timer from "../../components/Timer";
import { global } from "../../styles";
import { updateFirestore, addBookToDatabase, getUserName, removeToReadBook, addReadNowBook, addComment, updateLastReadBookID } from "../../api/firebaseCalls";
import { needEdit } from "../../api/GoogleBooksCalls";
import { getUniqueID } from "../../utils";
import LibraryBookDetailsHeader from "./LibraryBookDetailsHeader";
import LibraryBookDetailsComments from "./LibraryBookDetailsComments";
import LibraryBookDetailsReviews from "./LibraryBookDetailsReviews";

export default function LibraryBookDetails({ navigation, route, ...props }) {
  const { alreadyRead = false, bookPercent = null } = route.params;

  const { id } = route.params.data;
  const [name, setName] = useState(route.params.name);
  const [timerOn, setTimerOn] = useState(false);
  const [comments, setComments] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [writeComment, setWriteComment] = useState("");
  const [username, setUsername] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(true);

  useEffect(() => {
    // console.log("route name:", route.name);
    const unsub = getReviews();
    const unsub2 = getComments();
    return () => {
      unsub();
      unsub2();
    };
  }, []);

  useEffect(() => {
    console.log(route.params.options);
    if (route.params.options == false) setOptionsVisible(false);
    getUsername();
  }, []);

  const getUsername = async () => {
    const username = await getUserName(); //firebase call
    username ? setUsername(username) : setUsername(null);
  };

  const getComments = () => {
    return firebase
      .firestore()
      .collection("books/" + id + "/comments")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        //console.log("SNAPS ", snaps);
        snaps.length > 0 ? setComments(snaps) : setComments(null);
      });
  };

  const getReviews = () => {
    console.log("BOOK ID", id);
    return firebase
      .firestore()
      .collection("books/" + id + "/reviews")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        snaps.length > 0 ? setReviews(snaps) : setReviews(null);
      });
  };

  const handleBtnClick = (buttonName) => {
    if (alreadyRead) {
      //nawigacja do modala
    } else if (bookPercent != null) {
      handleReadNow();
    } else if (buttonName == "Dodaj do biblioteki") {
      handleAddToLibrary(route.params.data);
    } else if (buttonName == "Czytaj") {
      handleAddReadNow(route.params.data);
    }

    /*
    if (buttonName == "Dodaj do biblioteki") handleAddToLibrary(route.params.data);
    if (buttonName == "Czytaj") handleAddReadNow(route.params.data);
    if (buttonName == "Czytaj teraz!") handleReadNow();
    */
  };

  const handleAddToLibrary = (book) => {
    if (needEdit(book)) {
      book.alert = "Przed dodaniem książki do biblioteki, uzupełnij brakujące informacje";
      console.log(book);
      navigation.push("EditBook", book);
    } else addBookToDatabase(book.id, book.title, book.authors, book.description, book.thumbnail, book.pageCount);
  };

  const handleAddReadNow = (el) => {
    addReadNowBook(el.id, el.title, el.authors, el.description, el.thumbnail, el.pageCount);
    removeToReadBook(el.id);
  };

  const handleReadNow = () => {
    setTimerOn(true);
    updateLastReadBookID(route.params.data.id);
  };

  const handleAddComment = async (book) => {
    const commentID = getUniqueID();
    const dataToUpdate = { author: username, commentID: commentID, content: writeComment, date: firebase.firestore.FieldValue.serverTimestamp() };
    addComment(book.id, commentID, dataToUpdate);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <LibraryBookDetailsHeader
        bookPercent={route.params.bookPercent}
        data={route.params.data}
        name={name}
        handleBtnClick={handleBtnClick}
        options={optionsVisible}
        alreadyRead={alreadyRead}
      />

      <Timer
        closeModal={() => setTimerOn(false)}
        visible={timerOn}
        book={route.params.data}
        bookID={route.params.data.id}
        numberOfPages={route.params.data.pageCount}
      />

      <View style={styles.headerBody}>
        <View style={styles.headers}>
          <DefText family="Rubik-Regular" size={16}>
            Opis książki
          </DefText>
        </View>
        <View style={styles.separator}></View>
        <DefText family="OpenSans-LightItalic" size={14} color="rgba(0, 0, 0, 0.5)">
          {route.params.data.description}
        </DefText>
        <View style={styles.headers}>
          <DefText family="Rubik-Regular" size={16}>
            Recenzje
          </DefText>
        </View>
        <View style={styles.separator}></View>
        {reviews ? (
          <LibraryBookDetailsReviews reviews={reviews} />
        ) : (
          <DefText family="OpenSans-LightItalic" size={14} color="rgba(0, 0, 0, 0.5)">
            Brak recenzji
          </DefText>
        )}
        <TouchableOpacity
          onPress={() => navigation.push("AddReview", { bookID: route.params.data.id, username: username })}
          style={{ display: "flex", flexDirection: "row", marginTop: 32, marginBottom: 16, marginLeft: "auto", marginRight: 8 }}
        >
          <FontAwesome5 name="pen-nib" size={16} color="#383838" style={{ marginRight: 4 }} />
          <DefText family="OpenSans-Bold" size={11} color="#383838">
            Napisz swoją recenzję
          </DefText>
        </TouchableOpacity>
        <View style={styles.headers}>
          <DefText family="Rubik-Regular" size={16}>
            Komentarze
          </DefText>
        </View>
        <View style={styles.separator}></View>
        <LibraryBookDetailsComments
          comments={comments}
          data={route.params.data}
          writeComment={writeComment}
          handleAddComment={handleAddComment}
          setWriteComment={setWriteComment}
        />
      </View>
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
        lastReadPageNumber: PropTypes.number,
      }),
      name: PropTypes.string.isRequired,
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
  header: {
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

  headerBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  separator: {
    width: 50,
    height: 2,
    marginTop: 8,
    marginBottom: 24,
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
  headers: {
    marginTop: 32,
  },
  link: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    marginBottom: 12,
    paddingTop: 8,
  },
});

//comments

// trzeba w onpressach dawać {() => function} zamiast {function} inaczej odpala od razu
