import React, { useState } from "react";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { globalSheet } from "../../styles";
import { getFirebase } from "../../api/firebaseCalls";

function ProfileScreen() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleSearchButton = async (username) => {
    const result = await getFirebase(username);
    console.log(result);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <DefText>Profile Screen</DefText>
        <View style={{ width: "75%" }}>
          <TextInput style={globalSheet.input} value={searchInput} onChangeText={(val) => setSearchInput(val)} placeholder="Szukaj znajomego..." />
          <TouchableOpacity
            style={{ position: "absolute", right: 16, top: 8 }}
            onPress={() => {
              handleSearchButton(searchInput);
            }}
          >
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({ container: { padding: 16 } });
