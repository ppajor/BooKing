import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { StyleSheet, View, TouchableOpacity, Modal, Image } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { logOut, getUserName, getAvatar } from "../../api/firebaseCalls";
import FriendsModal from "./FriendsModal";
import EditProfileModal from "./EditProfileModal";
import { useNavigation } from "@react-navigation/native";
import { globalSheet, global } from "../../styles";

function ProfileScreen() {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [toReadLength, setToReadLength] = useState(0);
  const [readNowLength, setReadNowLength] = useState(0);
  const [alreadyReadLength, setAlreadyReadLength] = useState(0);
  const [toRead, setToRead] = useState(null);
  const [readNow, setReadNow] = useState(null);
  const [alreadyRead, setAlreadyRead] = useState(null);
  const [modalFriendsVisible, setModalFriendsVisible] = useState(false);
  const [modalEditProfileVisible, setModalEditProfileVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();
  console.log("avatarr", avatar);
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

  const getAlreadyRead = () => {
    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/booksAlreadyRead")
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
    const username = await getUserName();
    const avatar = await getAvatar();
    setCurrentUsername(username);
    setAvatar(avatar);
  };

  return (
    <Screen>
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
            <DefText family="Rubik-Medium" size={20}>
              {currentUsername}
            </DefText>
          </View>
          <View style={styles.bookNumberContainer}>
            <View style={styles.bookNumberContent}>
              <View style={{ marginBottom: 8 }}>
                <DefText size={14} family="Rubik-Regular" color="rgba(0,0,0,0.5)">
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
                <DefText size={14} family="Rubik-Regular" color="rgba(0,0,0,0.5)">
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
            <View style={styles.bookNumberContent}>
              <View style={{ marginBottom: 8 }}>
                <DefText size={14} family="Rubik-Regular" color="rgba(0,0,0,0.5)">
                  Przeczytane
                </DefText>
              </View>
              {alreadyRead && (
                <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: readNow })}>
                  <DefText family="Rubik-Regular" size={20}>
                    {alreadyReadLength}
                  </DefText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.profileModals, globalSheet.shadowPrimary]}>
          <TouchableOpacity onPress={() => setModalFriendsVisible(true)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeaderIcon}>
                <FontAwesome5 name="user-friends" size={24} color={global.textColor} style={{ marginRight: 8 }} />
                <DefText color="rgba(0,0,0,0.75)">Znajomi</DefText>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="rgba(0,0,0,0.75)" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalEditProfileVisible(true)}
            style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: "#f2f2f2", paddingTop: 16 }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalHeaderIcon}>
                <FontAwesome5 name="user-edit" size={24} color="black" style={{ marginRight: 8 }} />
                <DefText color="rgba(0,0,0,0.75)">Edycja profilu</DefText>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="rgba(0,0,0,0.75)" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => logOut()} style={styles.signOut}>
          <MaterialIcons name="exit-to-app" size={20} color="black" style={{ marginRight: 4 }} />
          <DefText family="OpenSans-Italic" size={14} color="rgba(0,0,0,0.75)">
            Wyloguj się
          </DefText>
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalEditProfileVisible}
          onRequestClose={() => {
            setModalEditProfileVisible(!modalEditProfileVisible);
          }}
        >
          <EditProfileModal closeModal={() => setModalEditProfileVisible(false)} />
        </Modal>
      </View>
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
