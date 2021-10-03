import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import SearchResult from "../../components/SearchResult";
import firebase from "firebase";
import LastRead from "../../components/LastRead";
import { getData } from "../../api/GoogleBooksCalls";
import { logOut, getFirebase } from "../../api/firebaseCalls";
import DefText from "../../components/DefText";
import Shelf from "../../components/Shelf";
import Screen from "../../components/Screen";
import { global } from "../../styles";

export default function Home({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState({});
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // po zalogowaniu/utworzeniu konta automatycznie przekierowuje do home bo zmienia się state userloggedin (???)

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLoggedIn(user) : console.log("No user logged in");
    });
    return subscriber;
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const result = await getFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library"
    );
    if (result) setUserData(result);
  };

  const apiCall = async (path) => {
    let data = await getData(path);
    setApiData(data);
  };

  const handleSearchButton = async () => {
    let phrase = searchInput.trim().split(/\s+/).join("+");
    apiCall(
      `https://www.googleapis.com/books/v1/volumes?q=${phrase}&startIndex=11&key=${API_KEY}&maxResult=5`
    );
  };

  handleSignOut = () => {
    logOut();
    navigation.push("WelcomePage");
  };

  const addNewHandler = () => {
    console.log(refresh);
    setRefresh((old) => !old);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {userLoggedIn && userData && (
          <>
            <View style={styles.userLoggedInNavbar}>
              <DefText>Hello {userLoggedIn.email}</DefText>
              <TouchableOpacity onPress={handleSignOut}>
                <DefText>Sign Out</DefText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginBottom: 8,
                padding: global.padding,
                paddingTop: 0,
              }}
            >
              <DefText size={32} family="Rubik-Regular">
                Witamy ponownie!
              </DefText>
            </View>
            <LastRead />
            <Shelf data={userData.toRead} name="Do przeczytania" />
            <Shelf
              data={userData.readNow}
              name="Czytane teraz"
              percentage={true}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("BookScanner")}
            >
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
            <Button
              onPress={handleSearchButton}
              title="Search"
              color="dodgerblue"
            />

            {apiData.items && (
              <SearchResult
                addNew={addNewHandler}
                data={apiData}
                currentUserUID={userLoggedIn.uid}
              />
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    color: "#000",
  },
  userLoggedInNavbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: global.padding,
    paddingTop: 16,
    paddingBottom: 0,
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
