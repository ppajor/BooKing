import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import DefText from "./DefText";
import { addReadNowBook, addBookToDatabase } from "../api/firebaseCalls";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { needEdit, bookData } from "../api/GoogleBooksCalls";

function SearchBookDetails({ item }) {
  const navigation = useNavigation();

  const handleAdd = (el) => {
    let book = bookData(el);
    if (needEdit(book)) {
      book.alert = "Przed dodaniem książki do biblioteki, uzupełnij brakujące informacje";
      navigation.push("EditBook", book);
    } else {
      //addBookToDatabase(book.id, book.title, book.authors, book.description, book.thumbnail, book.pageCount);
      addBookToDatabase(book.id, book.title, book.authors, book.description, book.thumbnail, book.pageCount);
    }
  };

  const handlePress = (el) => {
    const book = bookData(el);
    book.lastReadPageNumber = 1;
    navigation.push("LibraryBookDetails", {
      data: book,
      name: "Dodaj do biblioteki",
    });
  };

  return (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.foundBookContainer}>
      {item.volumeInfo.imageLinks ? (
        <Image style={styles.image} source={{ uri: item.volumeInfo.imageLinks.thumbnail }} />
      ) : (
        <Image source={require("../img/no_cover_book.jpg")} style={styles.image} />
      )}

      <View style={{ marginBottom: 4 }}>
        <DefText family="OpenSans-SemiBold" size={11} align="center">
          {item.volumeInfo.title}
        </DefText>
      </View>
      <DefText family="Rubik-LightItalic" size={11} align="center">
        {item.volumeInfo.authors[0]}
      </DefText>
      <TouchableOpacity style={{ marginTop: 8 }} onPress={() => handleAdd(item)}>
        <DefText family="OpenSans-SemiBold" size={11} color="#B58B8B">
          Add to library
        </DefText>
      </TouchableOpacity>
    </TouchableOpacity>
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
    marginBottom: 16,
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
