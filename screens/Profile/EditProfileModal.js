import React, { useState } from "react";
import Screen from "../../components/Screen";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";
import DefText from "../../components/DefText";
import PickImage from "../../components/PickImage";
import { updateFirestore } from "../../api/firebaseCalls";
import { globalSheet } from "../../styles";

function EditProfileModal() {
  const [imagePath, setImagePath] = useState(null);

  const handleSave = async () => {
    await updateImage(imagePath)
      .then(() => {
        var ref = firebase
          .storage()
          .ref("users/" + firebase.auth().currentUser.uid)
          .child("avatar");
        ref.getDownloadURL().then((url) => {
          updateFirestore("users/", firebase.auth().currentUser.uid, { avatar: url }); //update url w bazie
        });
      })
      .catch(() => {
        console.log("Error in photo upload");
      });
  };

  const updateImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref("users/" + firebase.auth().currentUser.uid)
      .child("avatar");
    return ref.put(blob);
  };

  return (
    <Screen>
      <View style={{ flex: 1, padding: 16 }}>
        <PickImage width={150} height={150} aspect={[3, 3]} setPath={(path) => setImagePath(path)} />

        <TouchableOpacity style={[globalSheet.btn, styles.saveBtn]} onPress={() => handleSave()}>
          <DefText color="#fff">Zapisz zmiany</DefText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default EditProfileModal;

const styles = StyleSheet.create({
  saveBtn: {
    position: "absolute",
    bottom: 32,
    left: 16,
    width: "100%",
  },
});
