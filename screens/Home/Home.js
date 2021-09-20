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
import SearchResult from "../../components/SearchResult";
import { Link } from "react-router-native";
import firebase from "firebase";
import ToReadShelf from "../../components/ToReadShelf";
import ReadNowShelf from "../../components/ReadNowShelf";
import LastRead from "../../components/LastRead";
import { getData } from "../../api/GoogleBooksCalls";
import { logOut } from "../../api/FirebaseCalls";
import DefText from "../../components/DefText";

export default function Home({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false); // po zalogowaniu/utworzeniu konta automatycznie przekierowuje do home bo zmienia się state userloggedin (???)

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = (user) => {
    if (user) {
      setUserLoggedIn(user);
    } else {
      console.log("No user logged in");
    }
  };

  const apiCall = async (path) => {
    let data = await getData(path);
    setApiData(data);
  };

  const handleSearchButton = async () => {
    let phrase = searchInput.trim().split(/\s+/).join("+");
    apiCall(
      `https://www.googleapis.com/books/v1/volumes?q=${phrase}&key=${API_KEY}`
    );
  };

  handleSignOut = () => {
    logOut();
  };

  const addNewHandler = () => {
    console.log(refresh);
    setRefresh((old) => !old);
  };

  return (
    <ScrollView style={styles.container}>
      {userLoggedIn && (
        <TouchableOpacity onPress={handleSignOut}>
          <DefText>Hello {userLoggedIn.email}</DefText>
          <DefText size={32} family="Rubik-Regular">
            Welcome back!
          </DefText>
          <DefText>Sign Out</DefText>
        </TouchableOpacity>
      )}
      <LastRead />
      <ToReadShelf refresh={refresh} />
      <ReadNowShelf />
      <TouchableOpacity onPress={() => navigation.navigate("BookScanner")}>
        <DefText>Scan Book</DefText>
      </TouchableOpacity>

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
        <SearchResult
          addNew={addNewHandler}
          data={apiData}
          currentUserUID={userLoggedIn.uid}
        />
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
