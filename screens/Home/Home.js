import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase";
import LastRead from "../../components/LastRead";
import { getUserName, getAvatar } from "../../api/firebaseCalls";
import { FontAwesome } from "@expo/vector-icons";

import DefText from "../../components/DefText";
import Shelf from "../../components/Shelf";
import Screen from "../../components/Screen";
import { global } from "../../styles";
import { Image } from "react-native-svg";

export default function Home({ navigation }) {
  const [lastRead, setLastRead] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // po zalogowaniu/utworzeniu konta automatycznie przekierowuje do home bo zmienia się state userloggedin (???)
  const [username, setUsername] = useState(null);
  const [booksReadNow, setBooksReadNow] = useState(null);
  const [booksToRead, setBooksToRead] = useState(null);
  const [booksAlreadyRead, setBooksAlreadyRead] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [wikusia, setWikusia] = useState(false);

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";
  //console.log("USER ID LOGGED IN:" + firebase.auth().currentUser.uid);
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLoggedIn(user) : navigation.push("LoadingScreen");
    });
    return subscriber;
  }, []);

  useEffect(() => {
    getUserInfo();
    console.log("RERENDER");
    const unsub = getReadNow();
    const unsub2 = getToRead();
    const unsub3 = getLastRead();
    const unsub4 = getAlreadyRead();
    return () => {
      unsub();
      unsub2();
      unsub3();
      unsub4();
    };
  }, []); //podczas resfreshu komponent rerender

  const getLastRead = () => {
    //do komponentu LastRead muszę dodać key bo inaczej nie zupdatuje
    return firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        const array = doc.data().lastRead;
        const last = array[array.length - 1];
        console.log("lastread array:", last);
        last ? setLastRead(last) : setLastRead(null);
      });
  };

  const getToRead = () => {
    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/booksToRead")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        setBooksToRead(snaps);
      });
  };

  const getReadNow = () => {
    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/booksReadNow")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        setBooksReadNow(snaps);
      });
  };

  const getAlreadyRead = () => {
    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/booksAlreadyRead")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        setBooksAlreadyRead(snaps);
      });
  };

  const getUserInfo = async () => {
    const usernameResult = await getUserName();
    const avatarResult = await getAvatar();
    usernameResult ? setUsername(usernameResult) : setUsername(null);
    setAvatar(avatarResult);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {username && (
          <>
            <View style={styles.userLoggedInNavbar}>
              <View>
                <DefText family="OpenSans-Italic" color="#C9C9C9">
                  Hello...
                </DefText>
                <View style={{ marginLeft: 38 }}>
                  <DefText family="Rubik-Medium" size={24} color={global.primaryColor}>
                    {username}
                  </DefText>
                </View>
              </View>
              <View>
                {avatar ? (
                  <>
                    <Image source={{ uri: avatar }} style={styles.image} />
                  </>
                ) : (
                  <TouchableOpacity>
                    <FontAwesome name="user-circle-o" size={32} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Image source={{ uri: avatar }} />
            {lastRead && <LastRead id={lastRead} key={lastRead} />}
            {booksToRead ? <Shelf data={booksToRead} name="Do przeczytania" /> : <Shelf name="Do przeczytania" />}
            {booksReadNow ? <Shelf data={booksReadNow} name="Czytane teraz" percentage={true} /> : <Shelf name="Czytane teraz" percentage={true} />}
            {booksAlreadyRead ? <Shelf data={booksAlreadyRead} name="Przeczytane" /> : <Shelf name="Przeczytane" />}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    marginBottom: 32,
    padding: global.padding,
    paddingTop: 32,
    paddingBottom: 0,
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: 16,
    borderRadius: 16,
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
