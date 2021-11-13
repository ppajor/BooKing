import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as firebase from "firebase";
import { global, globalSheet } from "../../styles";
import { updateFirebase, addBookToDatabase, updateFirestore } from "../../api/firebaseCalls";
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
    //console.log(id);

    if (author == "" || bookDescription == "" || pages == "" || (thumbnail == null && imagePath == null) || bookTitle == "") {
      setError("Wszystkie pola muszą być wypełnione");
    } else {
      // console.log(`Thumbnail ${thumbnail}`);

      if (imagePath != "") {
        addBookToDatabase(id, bookTitle, author, bookDescription, thumbnail, pages);
        await updateImage(imagePath)
          .then(() => {
            var ref = firebase.storage().ref().child(id);

            ref.getDownloadURL().then((url) => {
              //console.log(url);
              updateUrl(url);
              // navigation.push("Home");
            });
          })
          .catch(() => {
            console.log("Error in photo upload");
          });
      } else {
        addBookToDatabase(id, bookTitle, author, bookDescription, thumbnail, pages);
        //navigation.push("Home");
      }
    }
  };

  const getBookId = () => {
    return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
  };

  const updateUrl = async (url) => {
    //await updateFirebase("/users/" + firebase.auth().currentUser.uid + "/library/toRead/" + id, { thumbnail: url });
    //firebase.firestore().collection("users/"+ firebase.auth().currentUser.uid +"/booksToRead")
    updateFirestore("users/" + firebase.auth().currentUser.uid + "/booksToRead", id, { thumbnail: url });
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
            <DefText family="Rubik-Medium" color="rgba(0,0,0,0.35)">
              Title
            </DefText>
          </View>
          <TextInput style={globalSheet.lineInput} value={bookTitle} onChangeText={(el) => setBookTitle(el)} />
        </View>
        <View style={styles.property}>
          <View style={styles.headerDecorator}>
            <DefText family="Rubik-Medium" color="rgba(0,0,0,0.35)">
              Author
            </DefText>
          </View>
          <TextInput style={globalSheet.lineInput} value={author} onChangeText={(el) => setAuthor(el)} />
        </View>
        <View style={styles.property}>
          <View style={styles.headerDecorator}>
            <DefText family="Rubik-Medium" color="rgba(0,0,0,0.35)">
              Description
            </DefText>
          </View>

          <TextInput
            style={[globalSheet.multilineInput, styles.textarea]}
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
            <DefText family="Rubik-Medium" color="rgba(0,0,0,0.35)">
              Pages
            </DefText>
          </View>
          {pageCount ? (
            <TextInput style={globalSheet.lineInput} value={pageCount.toString()} keyboardType="numeric" />
          ) : (
            <TextInput style={[globalSheet.lineInput, styles.fillInfo]} value={pages} onChangeText={(e) => setPages(e)} />
          )}
        </View>
        {error && (
          <DefText size={14} color="red">
            {error}
          </DefText>
        )}
        <View style={{ flex: 1, marginTop: 48 }}>
          <TouchableOpacity onPress={() => handleSave()} style={globalSheet.btn}>
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
    width: 115,
    height: 175,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 48,
  },
  property: {
    width: "100%",
    display: "flex",
    marginBottom: 16,
    padding: 16,

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
    marginTop: 16,
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
});
