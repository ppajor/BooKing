import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import firebase from "firebase";
import DefText from "./DefText";
import { useNavigation } from "@react-navigation/native";
import { updateFirebase } from "../api/firebaseCalls";

const Timer = (props) => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState("1");

  const navigation = useNavigation();

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const showTime = () => {
    return (
      Math.floor(time / 3600) +
      ":" +
      Math.floor((time / 60) % 60) +
      ":" +
      (time % 60)
    );
  };

  const endReading = () => {
    setTimerOn(false);
    setModalVisible(true);
  };

  const savePageNumber = (num) => {
    const dataToUpdate = { lastReadPageNumber: parseInt(num) };
    updateFirebase(
      "/users/" +
        firebase.auth().currentUser.uid +
        "/library/readNow/" +
        props.bookID,
      dataToUpdate
    );

    navigation.push("Home");
  };

  return (
    <View>
      <DefText align="center" size={32}>
        {showTime()}
      </DefText>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 24,
        }}
      >
        <TouchableHighlight onPress={() => setTime(0)}>
          <DefText>WYCZYSC</DefText>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setTimerOn(false)}>
          <DefText>STOP</DefText>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setTimerOn(true)}>
          <DefText>WZNOW</DefText>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => endReading()}>
          <DefText>ZAKOŃCZ</DefText>
        </TouchableHighlight>
      </View>
      {modalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Na jakiej stronie skończyłeś czytać?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPageNumber}
            value={pageNumber}
          />
          <TouchableHighlight onPress={() => savePageNumber(pageNumber)}>
            <DefText>Zatwierdź</DefText>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: 120,
    marginVertical: 24,
    marginHorizontal: 24,
  },
  modalText: {
    color: "#a8a8a8",
  },
});
