import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { TextInput, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { globalSheet } from "../../styles";
import { getFirebase, searchUsername, updateFirebase, currentUserId, logOut, getUserName } from "../../api/firebaseCalls";
import FriendList from "../../components/FriendList";

function ProfileScreen({ navigation }) {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const username = await getUserName();
    setCurrentUsername(username);
  };

  const handleSearchButton = async (username) => {
    const result = await searchUsername(username);
    console.log("result", result);
    setSearchResult(result);
  };

  const handleAddFriend = async () => {
    const dataToUpdate = { friendID: searchResult.userID, username: searchResult.name };
    updateFirestore("/usernames/" + username + "/friends/", dataToUpdate.friendID, dataToUpdate);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <DefText>Profile Screen</DefText>
        <View style={{ width: "75%" }}>
          <TextInput
            style={[globalSheet.input, styles.input]}
            value={searchInput}
            onChangeText={(val) => setSearchInput(val)}
            placeholder="Szukaj znajomego..."
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 16, top: 8 }}
            onPress={() => {
              handleSearchButton(searchInput);
            }}
          >
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {searchResult && (
          <>
            <DefText>{searchResult.name}</DefText>
            <TouchableOpacity onPress={() => handleAddFriend()}>
              <DefText>Dodaj do znajomych</DefText>
            </TouchableOpacity>
          </>
        )}
        {currentUsername && <FriendList username={currentUsername} />}
        <TouchableOpacity onPress={() => logOut()}>
          <DefText>Sign Out</DefText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({ container: { padding: 16 }, input: { height: 40 } });
