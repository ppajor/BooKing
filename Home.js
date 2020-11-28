import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import SearchResult from "./SearchResult";
import Library from "./Library";
import { Link } from "react-router-native";
import firebase from "firebase";

export default function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false); // po zalogowaniu/utworzeniu konta automatycznie przekierowuje do home bo zmienia się state userloggedin (???)

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

  /*
  useEffect(()=>{
    firebase.database()
  .ref('/users/123')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });
  })
*/

  const onAuthStateChanged = (user) => {
    if (user) {
      setUserLoggedIn(user);
      //console.log(user);
    } else {
      console.log("No user logged in");
    }
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  handleSearchButton = () => {
    let phrase = searchInput.trim().split(/\s+/).join("+");

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${phrase}&key=${API_KEY}
    `)
      .then((response) => response.json())
      .then((responseJson) => {
        setApiData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        props.history.push("/chooseLoginVariant");
      });
  };

  return (
    <ScrollView style={styles.container}>
      {userLoggedIn && (
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Hello {userLoggedIn.email}</Text>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      )}
      <Library />
      <Link to="./bookScanner">
        <Text>Scan Book</Text>
      </Link>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for a book..."
        onChangeText={(search_input_text) => {
          setSearchInput(search_input_text);
        }}
        value={searchInput}
      />
      <Button onPress={handleSearchButton} title="Search" color="dodgerblue" />
      {apiData.items && (
        <SearchResult data={apiData} currentUserUID={userLoggedIn.uid} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },

  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    color: "#000",
  },
});
/*
const library = [
  {
    bookID: "MKfYLfeyrfAAACAAJ",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "2zW3zQEAeyrCAAJ",
    bookImg:
      "http://books.google.com/books/content?id=vglvBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "ydhcbc5eyrx7xch",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "NHE7CQAAyerQBAJ",
    bookImg:
      "http://books.google.com/books/content?id=M3evDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "MKfYLAAACeyrAdAJ",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "NHE7CQAAeryQBAJ",
    bookImg:
      "http://books.google.com/books/content?id=M3evDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
];
*/
