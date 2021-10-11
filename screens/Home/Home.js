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
  const [lastRead, setLastRead] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // po zalogowaniu/utworzeniu konta automatycznie przekierowuje do home bo zmienia się state userloggedin (???)
  const [wikusia, setWIkusia] = useState(false);

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";
  //console.log("USER ID LOGGED IN:" + firebase.auth().currentUser.uid);
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLoggedIn(user) : console.log("No user logged in");
    });
    return subscriber;
  }, []);

  useEffect(() => {
    getUserData();
    console.log("RERENDER");
  }, [refresh]); //podczas resfreshu komponent rerender

  const getUserData = async () => {
    const result = await getFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library"
    );
    result ? setUserData(result) : setUserData(null); //jesli nie ma danych z api to setuj null, bo inaczej nie chce usunac się ostatnia ksiazka

    const lastread = await getFirebase(
      "/users/" + firebase.auth().currentUser.uid + "/library/lastRead"
    );
    lastread ? setLastRead(lastread) : setLastRead(null);
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
    navigation.push("WelcomePage");
  };

  const forceRefresh = () => {
    console.log(refresh);
    setRefresh(!refresh);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {userLoggedIn && (
          <>
            <View style={styles.userLoggedInNavbar}>
              <DefText color="#B58B8B">Hello {userLoggedIn.email}</DefText>
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
              <DefText size={32} family="Rubik-Medium">
                Witamy ponownie!
              </DefText>
            </View>
            {userData ? (
              <>
                {lastRead && (
                  <LastRead id={lastRead} book={userData.readNow[lastRead]} />
                )}

                <Shelf
                  data={userData.toRead}
                  name="Do przeczytania"
                  refresh={forceRefresh}
                />
                <Shelf
                  data={userData.readNow}
                  name="Czytane teraz"
                  refresh={forceRefresh}
                  percentage={true}
                />
              </>
            ) : (
              <>
                <Shelf name="Do przeczytania" refresh={forceRefresh} />
                <Shelf name="Czytane teraz" percentage={true} />
              </>
            )}
            {wikusia && (
              <>
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

                {wikusia && (
                  <SearchResult
                    addNew={forceRefresh}
                    data={apiData}
                    currentUserUID={userLoggedIn.uid}
                  />
                )}
              </>
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
