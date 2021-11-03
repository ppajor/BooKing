import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DefText from "../../components/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getToRead } from "../../api/firebaseCalls";

function FriendProfile({ navigation, ...props }) {
  const { id, username } = props.route.params;
  const [booksToRead, setBooksToRead] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const booksToRead = await getToRead(id);
    setBooksToRead(booksToRead);
  };

  return (
    <View>
      <DefText>{username}</DefText>
      {booksToRead && (
        <TouchableOpacity onPress={() => navigation.push("AllBooksShelf", { booksToRead })}>
          <DefText>Zobacz do przeczytania</DefText>
        </TouchableOpacity>
      )}

      <TouchableOpacity>
        <DefText>Zobacz czytane</DefText>
      </TouchableOpacity>
      <TouchableOpacity>
        <DefText>Zobacz przeczytane</DefText>
      </TouchableOpacity>
    </View>
  );
}

export default FriendProfile;
