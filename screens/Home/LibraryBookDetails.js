import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Touchable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PropTypes from "prop-types";
import firebase from "firebase";
import DefText from "../../components/DefText";
import Timer from "../../components/Timer";
import { global } from "../../styles";
import { updateFirebase, removeFirebase, addBookToDatabase, getFirebase, getUsername } from "../../api/firebaseCalls";
import { needEdit } from "../../api/GoogleBooksCalls";
import { getUniqueID } from "../../utils";
import LibraryBookDetailsHeader from "./LibraryBookDetailsHeader";
import LibraryBookDetailsComments from "./LibraryBookDetailsComments";
import LibraryBookDetailsReviews from "./LibraryBookDetailsReviews";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LibraryBookDetails({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const [timerOn, setTimerOn] = useState(false);
  const [comments, setComments] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [writeComment, setWriteComment] = useState("");
  const [newCommentFlag, setNewcommentFlag] = useState(false);
  const [newReviewFlag, setNewReviewFlag] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    getReviews();
  }, [newReviewFlag]);

  useEffect(() => {
    getComments();
  }, [newCommentFlag]);

  useEffect(() => {
    getUsernameAsync();
  }, []);

  const getUsernameAsync = async () => {
    const user = await getUsername();
    setUsername(user);
  };

  const getComments = async () => {
    const comments = await getFirebase("/books/" + route.params.data.id + "/comments");
    if (comments) setComments(Object.values(comments));
  };

  const getReviews = async () => {
    const reviews = await getFirebase("/books/" + route.params.data.id + "/reviews");
    console.log(reviews);

    if (reviews) {
      setReviews(Object.values(reviews));
    }
  };

  const handleBtnClick = (buttonName) => {
    if (buttonName == "Dodaj do biblioteki") handleAddToLibrary(route.params.data);
    if (buttonName == "Czytaj") handleAddReadNow(route.params.data);
    if (buttonName == "Czytaj teraz!") handleReadNow();
  };

  const handleAddToLibrary = (book) => {
    if (needEdit(book)) {
      book.alert = "Przed dodaniem książki do biblioteki, uzupełnij brakujące informacje";
      console.log(book);
      navigation.push("EditBook", book);
    } else {
      addBookToDatabase(book.id, book.title, book.authors, book.description, book.thumbnail, book.pageCount);
      navigation.push("Home");
    }
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
    updateFirebase("/users/" + firebase.auth().currentUser.uid + "/library/readNow/", dataToUpdate);
    removeFirebase("/users/" + firebase.auth().currentUser.uid + "/library/toRead/" + el.id);
    navigation.push("Home");
  };

  const handleReadNow = () => {
    setTimerOn(true);
    const dataToUpdate = { lastRead: route.params.data.id };
    updateFirebase("/users/" + firebase.auth().currentUser.uid + "/library", dataToUpdate);
  };

  const handleAddComment = async (book) => {
    console.log(book);
    console.log(writeComment);
    const commentID = getUniqueID();
    const dataToUpdate = { author: username, commentID: commentID, content: writeComment };
    await updateFirebase("/books/" + book.id + "/comments/" + commentID, dataToUpdate);
    setNewcommentFlag(!newCommentFlag);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <LibraryBookDetailsHeader
        thumbnail={route.params.data.thumbnail}
        bookPercent={route.params.bookPercent}
        title={route.params.data.title}
        authors={route.params.data.authors}
        data={route.params.data}
        name={name}
        handleBtnClick={handleBtnClick}
      />
      {timerOn && <Timer bookID={route.params.data.id} />}

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
          <DefText size={11} color="rgba(0,0,0,0.35)">
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
