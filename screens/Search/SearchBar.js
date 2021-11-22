import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, FlatList, Image, Text } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import DefText from "../../components/DefText";
import { getData, filterData } from "../../api/GoogleBooksCalls";
import SearchBookDetails from "../../components/SearchBookDetails";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

function SearchBar(props) {
  const [apiData, setApiData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [wikusia, setWikusia] = useState(false);

  const navigation = useNavigation();

  const apiCall = async (path) => {
    let data = await getData(path);
    const filteredData = filterData(data.items);
    // console.log(filteredData);
    setApiData(filteredData);
  };

  const handleSearchButton = async () => {
    let phrase = searchInput.trim().split(/\s+/).join("+");
    apiCall(`https://www.googleapis.com/books/v1/volumes?q=${phrase}&maxResults=40&key=${API_KEY}`);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <View style={{ width: "75%" }}>
            <TextInput style={styles.input} value={searchInput} onChangeText={(val) => setSearchInput(val)} placeholder="Szukaj książki..." />
            <TouchableOpacity
              style={{ position: "absolute", right: 16, top: 8 }}
              onPress={() => {
                handleSearchButton();
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.push("BookScanner")}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" style={{ marginLeft: 24, marginRight: 8 }} />
            <DefText size={12} family="OpenSans-Light">
              scan
            </DefText>
          </TouchableOpacity>
        </View>
        {apiData && (
          <FlatList horizontal data={Object.values(apiData)} renderItem={({ item }) => <SearchBookDetails item={item} />} keyExtractor={(item) => item.id} />
        )}
        <View style={styles.addBook}>
          <DefText size={11} family="OpenSans-Light">
            Nie znalazłeś swojej książki?
          </DefText>
          <TouchableOpacity onPress={() => navigation.push("EditBook", { screen: "HomeScreen" })}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons name="book-plus" size={16} color="black" style={{ marginRight: 4 }} />
              <DefText size={11} family="OpenSans-Bold">
                Dodaj ją ręcznie
              </DefText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 24,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  searchInputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 16,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  addBook: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
});
