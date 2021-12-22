import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import PropTypes from "prop-types";
import firebase from "firebase";
import DefText from "./DefText";
import { useNavigation } from "@react-navigation/native";
import { updateFirestore, addBookToAlreadyRead, removeReadNowBook, saveTimerData } from "../api/firebaseCalls";
import { global, globalSheet } from "../styles";
import { convertToSeconds, getUniqueID } from "../utils";

const Timer = ({ book, numberOfPages, ...props }) => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState("1");
  const [sliderValue, setSliderValue] = useState(book.lastReadPageNumber);

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
    return Math.floor(time / 3600) + ":" + Math.floor((time / 60) % 60) + ":" + (time % 60);
  };

  const endReading = () => {
    setTimerOn(false);
    setModalVisible(true);
  };

  const handleSave = (num) => {
    props.closeModal();
    const dataToUpdate = { lastReadPageNumber: parseInt(num) };
    const data = Date.now();
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time / 60) % 60);
    const seconds = time % 60;
    const secondsConvertion = convertToSeconds(hour, minute, seconds);
    const statID = getUniqueID();
    if (parseInt(num) == numberOfPages) {
      // jesli ksiazka została w 100% przeczytana
      addBookToAlreadyRead(book.id, book.title, book.authors, book.description, book.thumbnail, book.pageCount);
      removeReadNowBook(book.id);
    } else updateFirestore("/users/" + firebase.auth().currentUser.uid + "/booksReadNow/", props.bookID, dataToUpdate);
    //updateFirebase("/users/" + firebase.auth().currentUser.uid + "/readTime/" + props.bookID + data, { hours: hour, minutes: minute });
    saveTimerData(statID, secondsConvertion, book.id);
    navigation.push("Home");
  };

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.closeModal()}
      style={{ margin: 0, alignItems: "center", justifyContent: "center" }}
    >
      <View style={[styles.modal, globalSheet.shadowPrimary]}>
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
            <Text style={styles.modalText}>Na której stronie skończyłeś czytać?</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Slider
                style={{ width: 200, height: 40 }}
                value={sliderValue}
                minimumValue={1}
                maximumValue={numberOfPages}
                minimumTrackTintColor={global.primaryColor}
                maximumTrackTintColor="#000000"
                onValueChange={(val) => setSliderValue(Math.floor(val))}
              />
              <DefText>
                {sliderValue}/{numberOfPages}
              </DefText>
            </View>
            <TouchableHighlight onPress={() => handleSave(sliderValue)} style={{ marginLeft: "auto" }}>
              <DefText>Zatwierdź</DefText>
            </TouchableHighlight>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default Timer;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: "35%",
    left: "5%",
    width: "90%",
    padding: 32,
    backgroundColor: "#fff",
  },
  modalContainer: {
    width: "100%",
    marginVertical: 24,
    marginHorizontal: 24,
  },
  modalText: {
    color: "#a8a8a8",
  },
});
