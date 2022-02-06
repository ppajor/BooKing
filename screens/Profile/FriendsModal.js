import React, { useState, useEffect } from "react";

import DefText from "../../components/DefText";
import { TextInput, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { globalSheet, global } from "../../styles";
import { getFirebase, searchUsername, updateFirebase, currentUserId, logOut, getUserName } from "../../api/firebaseCalls";
import FriendList from "../../components/FriendList";

function FriendsModal({ currentUsername, ...props }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);

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
    <View style={styles.container}>
      <View style={{ width: "75%", marginBottom: 24 }}>
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
      {searchResult ? (
        <View style={styles.searchResultContainer}>
          <DefText>Znaleziony użytkownik:</DefText>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 8 }}>
            <View style={{ marginLeft: 4 }}>
              <DefText family="Rubik-Regular">{searchResult.name}</DefText>
            </View>

            <TouchableOpacity style={{ marginTop: 4, marginLeft: "auto" }} onPress={() => handleAddFriend()}>
              <DefText family="Rubik-Medium" size={14} color={global.primaryColor}>
                Dodaj do znajomych
              </DefText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: 24 }}>
          <DefText family="OpenSans-LightItalic" size={14} color="rgba(0, 0, 0, 0.5)">
            Nie znaleziono wyników
          </DefText>
        </View>
      )}
      <DefText>Wszyscy znajomi:</DefText>
      <View style={{ width: 50, height: 2, backgroundColor: global.primaryColor, marginTop: 4, marginBottom: 8 }}></View>

      {currentUsername && <FriendList closeModal={props.closeModal} username={currentUsername} />}
    </View>
  );
}

export default FriendsModal;

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { height: 40 },
  searchResultContainer: {
    marginBottom: 16,
  },
});
