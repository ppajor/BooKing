import React, { useState, useEffect } from "react";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { StyleSheet, View, TouchableOpacity, Modal, Image } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { logOut, getUserName, getAvatar, getUserType } from "../../api/firebaseCalls";
import firebase from "firebase";
import FriendsModal from "./FriendsModal";
import EditProfileModal from "./EditProfileModal";
import { globalSheet, global } from "../../styles";
import UserProfileHeader from "../../components/UserProfileHeader";

function ProfileScreen() {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [modalFriendsVisible, setModalFriendsVisible] = useState(false);
  const [modalEditProfileVisible, setModalEditProfileVisible] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const getType = await getUserType();
    const username = await getUserName();
    setCurrentUsername(username);
    getType ? setUserType(getType) : setUserType(null);
  };

  return (
    <Screen>
      <View style={styles.container}>
        {currentUsername && <UserProfileHeader id={firebase.auth().currentUser.uid} username={currentUsername} />}
        {userType != "anonymous" && (
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
        )}

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
