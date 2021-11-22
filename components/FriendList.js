import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import DefText from "./DefText";

function FriendList({ username, ...props }) {
  const [friendsList, setFriendsList] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const unsub = getFriendsList();
    return () => {
      unsub();
    };
  }, []);

  const getFriendsList = () => {
    console.log("username", username);
    return firebase
      .firestore()
      .collection("usernames/" + username + "/friends/")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          snaps.push(doc.data());
        });
        console.log("SNAPS ", snaps);
        setFriendsList(snaps);
      });
  };

  return (
    <FlatList
      data={friendsList}
      keyExtractor={(item) => item.friendID}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            props.closeModal();
            navigation.push("FriendProfile", { id: item.friendID, username: item.username });
          }}
        >
          <DefText>{item.username}</DefText>
        </TouchableOpacity>
      )}
    />
  );
}

export default FriendList;

const styles = StyleSheet.create({
  container: {},
});
