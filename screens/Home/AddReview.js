import React, { useState } from "react";
import { View, StyleSheet, TextInput, Touchable, TouchableOpacity } from "react-native";
import DefText from "../../components/DefText";
import { AirbnbRating } from "react-native-ratings";
import { global, globalSheet } from "../../styles";
import { addReview } from "../../api/firebaseCalls";
import { getUniqueID } from "../../utils";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

function AddReview(props) {
  const { bookID, username } = props.route.params;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [note, setNote] = useState(0);

  const handlePress = () => {
    const id = getUniqueID();
    const data = { title: title, content: desc, author: username, note: note, id: id, date: firebase.firestore.FieldValue.serverTimestamp() };
    addReview(bookID, data, id);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <DefText family="Rubik-Bold" size={20}>
            Ocena:
          </DefText>
          <AirbnbRating
            onFinishRating={(note) => setNote(note)}
            count={10}
            reviews={["Kompromitacja", "Bardzo słaba", "Słaba", "Pół biedy", "Przeciętna", "Spoko", "Fajna", "Bardzo Fajna", "Uwielbiam!", "Kocham!!!"]}
            defaultRating={0}
            size={20}
          />
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Wpisz tytuł recenzji..."
            placeholderTextColor="rgba(0,0,0,0.35)"
          />
          <TextInput
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            style={styles.descInput}
            value={desc}
            onChangeText={(text) => setDesc(text)}
            placeholder="Tu pisz swoją recenzję..."
            placeholderTextColor="rgba(0,0,0,0.35)"
          />
        </View>
        <TouchableOpacity onPress={() => handlePress()} style={[globalSheet.btn, styles.btn]}>
          <DefText family="Rubik-Regular" color="#fff">
            Dodaj recenzję
          </DefText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default AddReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
  },
  titleInput: {
    width: "100%",
    fontSize: 24,
    borderBottomColor: global.primaryColor,
    borderBottomWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 48,
    marginBottom: 24,
  },
  descInput: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,

    borderColor: global.primaryColor,
    borderWidth: 2,
    borderRadius: 12,
  },
  btn: {
    marginTop: 16,
  },
});
