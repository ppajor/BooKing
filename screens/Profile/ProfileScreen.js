import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { logOut, getUserName } from "../../api/firebaseCalls";
import FriendsModal from "./FriendsModal";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const [currentUsername, setCurrentUsername] = useState(null);

  const [toReadLength, setToReadLength] = useState(0);
  const [readNowLength, setReadNowLength] = useState(0);
  const [toRead, setToRead] = useState(null);
  const [readNow, setReadNow] = useState(null);
  const [modalFriendsVisible, setModalFriendsVisible] = useState(false);

  console.log("Modal", modalFriendsVisible);
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
    console.log("RERENDER");
    const unsub = getReadNow();
    const unsub2 = getToRead();
    return () => {
      unsub();
      unsub2();
    };
  }, []);

  const getToRead = () => {
    console.log("ELO");

    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/booksToRead")
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
    console.log("ELO");

    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/booksReadNow")
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

  const getUserData = async () => {
    const username = await getUserName();
    setCurrentUsername(username);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.av}>
            <FontAwesome name="user-circle-o" size={96} color="black" />
          </TouchableOpacity>
          <View style={{ marginBottom: 32 }}>
            <DefText family="Rubik-Medium" size={20}>
              {currentUsername}
            </DefText>
          </View>
          <View style={styles.bookNumberContainer}>
            <View style={styles.bookNumberContent}>
              <View style={{ marginBottom: 8 }}>
                <DefText family="Rubik-Regular" color="rgba(0,0,0,0.5)">
                  Do przeczytania
                </DefText>
              </View>
              {toRead && (
                <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: toRead })}>
                  <DefText family="Rubik-Regular" size={20}>
                    {toReadLength}
                  </DefText>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.bookNumberContent}>
              <View style={{ marginBottom: 8 }}>
                <DefText family="Rubik-Regular" color="rgba(0,0,0,0.5)">
                  Czytane
                </DefText>
              </View>
              {readNow && (
                <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: readNow })}>
                  <DefText family="Rubik-Regular" size={20}>
                    {readNowLength}
                  </DefText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={styles.profileModals}>
          <TouchableOpacity onPress={() => setModalFriendsVisible(true)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeaderIcon}>
                <FontAwesome5 name="user-friends" size={24} color="black" style={{ marginRight: 8 }} />
                <DefText color="rgba(0,0,0,0.75)">Znajomi</DefText>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={16} color="rgba(0,0,0,0.5)" />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalFriendsVisible}
            onRequestClose={() => {
              setModalFriendsVisible(!modalFriendsVisible);
            }}
          >
            <FriendsModal closeModal={() => setModalFriendsVisible(false)} currentUsername={currentUsername} />
          </Modal>
        </View>
        <TouchableOpacity onPress={() => logOut()} style={styles.signOut}>
          <MaterialIcons name="exit-to-app" size={20} color="black" style={{ marginRight: 4 }} />
          <DefText family="OpenSans-Italic" size={14} color="rgba(0,0,0,0.75)">
            Wyloguj się
          </DefText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40 },
  profileHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 48,
  },
  av: {
    marginBottom: 16,
  },
  bookNumberContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bookNumberContent: {
    display: "flex",
    alignItems: "center",
  },
  profileModals: {
    marginTop: 56,
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
});
