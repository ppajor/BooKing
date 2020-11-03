import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import SearchResult from "./SearchResult";
import Library from "./Library";
import { Link } from "react-router-native";

export default function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState({});

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

  handleSearchButton = () => {
    let phrase = searchInput.trim().split(/\s+/).join("+");

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${phrase}&key=${API_KEY}
    `)
      .then((response) => response.json())
      .then((responseJson) => {
        setApiData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Library myLibrary={props.library} />
      <Link to="./bookScanner">
        <Text>Scan Book</Text>
      </Link>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for a book..."
        onChangeText={(search_input_text) => {
          setSearchInput(search_input_text);
        }}
        value={searchInput}
      />
      <Button onPress={handleSearchButton} title="Search" color="dodgerblue" />
      {apiData.items && <SearchResult data={apiData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },

  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    color: "#000",
  },
});
