import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DefText from "../../components/DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalShelf from "../../components/ModalShelf";
import { getFirebase, getToRead } from "../../api/firebaseCalls";
import { getData } from "../../api/GoogleBooksCalls";

function FriendProfile(props) {
  const { id, username } = props.route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [booksToRead, setBooksToRead] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const booksToRead = await getToRead(id);
    //console.log(booksToRead);
    setBooksToRead(booksToRead);
  };

  return (
    <View>
      <DefText>{username}</DefText>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <DefText>Zobacz do przeczytania</DefText>
      </TouchableOpacity>
      {booksToRead && <ModalShelf books={booksToRead} modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} />}
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
