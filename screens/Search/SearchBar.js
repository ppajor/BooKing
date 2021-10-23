import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DefText from "../../components/DefText";
import { getData, filterData } from "../../api/GoogleBooksCalls";
import SearchBookDetails from "../../components/SearchBookDetails";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

function SearchBar(props) {
  const [apiData, setApiData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const navigation = useNavigation();

  const apiCall = async (path) => {
    let data = await getData(path);
    const filteredData = filterData(data.items);
    // console.log(filteredData);
    setApiData(filteredData);
  };

  const handleSearchButton = async () => {
    let phrase = searchInput.trim().split(/\s+/).join("+");
    apiCall(
      `https://www.googleapis.com/books/v1/volumes?q=${phrase}&maxResults=40&key=${API_KEY}`
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View
            style={{
              width: "25%",
            }}
          >
            <DefText family="Rubik-Light" size={24}>
              Szukaj
            </DefText>
          </View>

          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.input}
              value={searchInput}
              onChangeText={(val) => setSearchInput(val)}
              placeholder="Wpisz tytuł książki"
            />
            <TouchableOpacity
              style={{ position: "relative", left: 16 }}
              onPress={() => {
                handleSearchButton();
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {apiData && (
          <FlatList
            horizontal
            data={Object.values(apiData)}
            renderItem={({ item }) => <SearchBookDetails item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
        <TouchableOpacity onPress={() => navigation.push("EditBook", {})}>
          <DefText>Utwórz książkę</DefText>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 350,
    padding: 24,
    paddingBottom: 48,
    backgroundColor: "rgba(181, 139, 139, 0.10)",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 24,
  },
  searchInputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    width: "75%",
    borderBottomColor: "rgba(0, 0, 0, 0.85)",
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingBottom: 8,
  },
});
