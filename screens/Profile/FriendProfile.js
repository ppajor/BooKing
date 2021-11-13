import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DefText from "../../components/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFriendToRead, getFriendReadNow } from "../../api/firebaseCalls";
import Screen from "../../components/Screen";

function FriendProfile({ navigation, ...props }) {
  const { id, username } = props.route.params;
  const [booksToRead, setBooksToRead] = useState(null);
  const [booksReadNow, setBooksReadNow] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const booksToRead = await getFriendToRead(id);
    console.log("books", booksToRead);
    setBooksToRead ? setBooksToRead(booksToRead) : setBooksToRead(null);

    const booksReadNow = await getFriendReadNow(id);
    booksReadNow ? setBooksReadNow(booksReadNow) : setBooksReadNow(null);
  };

  return (
    <Screen>
      <View styles={{ flex: 1, backgroundColor: "white" }}>
        <DefText>{username}</DefText>
        {booksToRead && (
          <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: booksToRead })}>
            <DefText>Zobacz do przeczytania</DefText>
          </TouchableOpacity>
        )}
        {booksReadNow && (
          <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { books: booksReadNow })}>
            <DefText>Zobacz czytane</DefText>
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <DefText>Zobacz przeczytane</DefText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default FriendProfile;
