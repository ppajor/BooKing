import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { TextInput, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { globalSheet } from "../../styles";
import { getFirebase, searchUsername, updateFirebase, currentUserId, logOut } from "../../api/firebaseCalls";

function ProfileScreen({ navigation }) {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [friendsList, setFriendsList] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { username } = await getFirebase("/users/" + firebase.auth().currentUser.uid);
    setCurrentUsername(username);
    const friendList = await getFirebase("/usernames/" + username + "/friends");
    if (friendList) setFriendsList(Object.values(friendList));
  };

  const handleSearchButton = async (username) => {
    const result = await searchUsername(username);
    setSearchResult(result);
  };

  const handleAddFriend = async () => {
    const dataToUpdate = { friendID: searchResult.userID, username: searchResult.name };
    updateFirebase("/usernames/" + username + "/friends/" + dataToUpdate.friendID, dataToUpdate);
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
        <FlatList
          data={friendsList}
          keyExtractor={(item) => item.friendID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", { id: item.friendID, username: item.username })}>
              <DefText>{item.username}</DefText>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={() => logOut()}>
          <DefText>Sign Out</DefText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({ container: { padding: 16 }, input: { height: 40 } });
