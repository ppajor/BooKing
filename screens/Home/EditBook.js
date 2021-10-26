import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as firebase from "firebase";
import { global } from "../../styles";
import { updateFirebase, addBookToDatabase } from "../../api/firebaseCalls";
import DefText from "../../components/DefText";
import PickImage from "../../components/PickImage";

function EditBook({ navigation, route }) {
  let { alert = null, authors = null, description = null, id = null, pageCount = null, thumbnail = null, title = null } = route.params;

  //state
  const [pages, setPages] = useState(pageCount ? pageCount : "");
  const [author, setAuthor] = useState(authors ? authors : "");
  const [bookTitle, setBookTitle] = useState(title ? title : "");
  const [bookDescription, setBookDescription] = useState(description ? description : "");
  const [imagePath, setImagePath] = useState(null);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    id = getBookId();
    console.log(id);

    if (author == "" || bookDescription == "" || pages == "" || (thumbnail == null && imagePath == null) || bookTitle == "") {
      setError("Wszystkie pola muszą być wypełnione");
    } else {
      console.log(`Thumbnail ${thumbnail}`);

      if (imagePath != "") {
        await addBookToDatabase(id, bookTitle, author, bookDescription, thumbnail, pages);
        await updateImage(imagePath)
          .then(() => {
            var ref = firebase.storage().ref().child(id);

            ref.getDownloadURL().then((url) => {
              console.log(url);
              updateUrl(url);
              navigation.push("Home");
            });
          })
          .catch(() => {
            console.log("Error in photo upload");
          });
      } else {
        await addBookToDatabase(id, bookTitle, author, bookDescription, thumbnail, pages);
        navigation.push("Home");
      }
    }
  };

  const getBookId = () => {
    return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
  };

  const updateUrl = async (url) => {
    await updateFirebase("/users/" + firebase.auth().currentUser.uid + "/library/toRead/" + id, { thumbnail: url });
  };

  const updateImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(id);
    return ref.put(blob);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {alert && (
          <View style={{ marginBottom: 24 }}>
            <DefText size={14} color="red">
              {alert}
            </DefText>
          </View>
        )}
        {thumbnail != null ? <Image source={{ uri: thumbnail }} style={styles.image} /> : <PickImage setPath={(path) => setImagePath(path)} />}

        <View style={styles.property}>
          <View style={styles.headerDecorator}>
            <DefText family="Rubik-Medium">Title</DefText>
          </View>
          <TextInput style={styles.input} value={bookTitle} onChangeText={(el) => setBookTitle(el)} />
        </View>
        <View style={styles.property}>
          <View style={styles.headerDecorator}>
            <DefText family="Rubik-Medium">Author</DefText>
          </View>
          <TextInput style={styles.input} value={author} onChangeText={(el) => setAuthor(el)} />
        </View>
        <View style={styles.property}>
          <View style={styles.headerDecorator}>
            <DefText family="Rubik-Medium">Description</DefText>
          </View>

          <TextInput
            style={[styles.input, styles.textarea]}
            value={bookDescription}
            onChangeText={(el) => {
              setBookDescription(el);
            }}
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.property}>
          <View style={styles.headerDecorator}>
            <DefText family="Rubik-Medium">Pages</DefText>
          </View>
          {pageCount ? (
            <TextInput style={styles.input} value={pageCount.toString()} keyboardType="numeric" />
          ) : (
            <TextInput style={[styles.input, styles.fillInfo]} value={pages} onChangeText={(e) => setPages(e)} />
          )}
        </View>
        {error && (
          <DefText size={14} color="red">
            {error}
          </DefText>
        )}
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => handleSave()} style={styles.btn}>
            <DefText size={14} color="#fff">
              Zapisz i dodaj do biblioteki
            </DefText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 48,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 48,
  },
  property: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    width: "90%",
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: "OpenSans-Regular",
    color: "rgba(0, 0, 0, 0.5);",
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
    borderRadius: 4,
  },
  textarea: {
    borderBottomWidth: 0,
  },
  fillInfo: { borderColor: "red" },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    width: "100%",
    marginTop: 48,
    paddingVertical: 10,
    backgroundColor: "#B58B8B",
  },
  headerDecorator: {
    borderBottomColor: global.primaryColor,
    borderBottomWidth: 2,
    paddingTop: 4,
    paddingBottom: 4,
  },
});
