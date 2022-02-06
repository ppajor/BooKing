import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Image } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { logOut, getUserName, getAvatar } from "../api/firebaseCalls";
import { globalSheet, global } from "../styles";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import DefText from "./DefText";
import Screen from "./Screen";

function UserProfileHeader({ id, username }) {
  const [toReadLength, setToReadLength] = useState(0);
  const [readNowLength, setReadNowLength] = useState(0);
  const [alreadyReadLength, setAlreadyReadLength] = useState(0);
  const [toRead, setToRead] = useState(null);
  const [readNow, setReadNow] = useState(null);
  const [alreadyRead, setAlreadyRead] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
    const unsub = getReadNow();
    const unsub2 = getToRead();
    const unsub3 = getAlreadyRead();
    return () => {
      unsub();
      unsub2();
      unsub3();
    };
  }, []);

  const getToRead = () => {
    return firebase
      .firestore()
      .collection("users/" + id + "/booksToRead")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        // console.log("TOREAD listener");
        setToRead(snaps);
        setToReadLength(snaps.length);
      });
  };

  const getReadNow = () => {
    return firebase
      .firestore()
      .collection("users/" + id + "/booksReadNow")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        setReadNow(snaps);
        setReadNowLength(snaps.length);
      });
  };

  const getAlreadyRead = () => {
    return firebase
      .firestore()
      .collection("users/" + id + "/booksAlreadyRead")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        // console.log("SNAPS ", snaps);
        setAlreadyRead(snaps);
        setAlreadyReadLength(snaps.length);
      });
  };

  const getUserData = async () => {
    const avatar = await getAvatar(id);
    setAvatar(avatar);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.profileHeader, globalSheet.shadowPrimary]}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.image} />
        ) : (
          <TouchableOpacity style={styles.av}>
            <FontAwesome name="user-circle-o" size={96} color="black" />
          </TouchableOpacity>
        )}

        <View style={{ marginBottom: 32 }}>
          <DefText family="Rubik-Medium" size={20} color="rgba(0,0,0,0.90)">
            {username}
          </DefText>
        </View>
        <View style={styles.bookNumberContainer}>
          <View style={styles.bookNumberContent}>
            <View style={{ marginBottom: 8 }}>
              <DefText size={14} family="Rubik-Regular" color="rgba(0,0,0,0.33)">
                Do przeczytania
              </DefText>
            </View>
            {toRead && (
              <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: toRead })}>
                <DefText family="Rubik-Medium" color="rgba(0,0,0,0.66)" size={20}>
                  {toReadLength}
                </DefText>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bookNumberContent}>
            <View style={{ marginBottom: 8 }}>
              <DefText size={14} family="Rubik-Regular" color="rgba(0,0,0,0.33)">
                Czytane
              </DefText>
            </View>
            {readNow && (
              <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: readNow })}>
                <DefText family="Rubik-Medium" size={20} color="rgba(0,0,0,0.66)">
                  {readNowLength}
                </DefText>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bookNumberContent}>
            <View style={{ marginBottom: 8 }}>
              <DefText size={14} family="Rubik-Regular" color="rgba(0,0,0,0.33)">
                Przeczytane
              </DefText>
            </View>
            {alreadyRead && (
              <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: alreadyRead })}>
                <DefText family="Rubik-Medium" size={20} color="rgba(0,0,0,0.66)">
                  {alreadyReadLength}
                </DefText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default UserProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
  },
  input: {
    height: 40,
  },
  profileHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 36,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  av: {
    marginBottom: 16,
  },
  bookNumberContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
  bookNumberContent: {
    display: "flex",
    alignItems: "center",
    width: "33%",
  },
  profileModals: {
    marginTop: 56,
    padding: 16,
    backgroundColor: "#fff",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalHeaderIcon: {
    display: "flex",
    flexDirection: "row",
  },
  signOut: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 32,
    right: 16,
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: 16,
    borderRadius: 16,
  },
});
