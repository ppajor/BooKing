import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, TouchableHighlight, Modal, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { removeToReadBook, removeReadNowBook, addBookToDatabase, addReadNowBook, removeLastReadID, updateBookRate } from "../../api/firebaseCalls";
import { global, globalSheet } from "../../styles";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";
import DefText from "../../components/DefText";
import OptionsModal from "./OptionsModal";

function LibraryBookDetailsHeader({ bookPercent, data, name, options, alreadyRead = false, ...props }) {
  const { id, authors, thumbnail, description, title, pageCount, note = 0 } = data;
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [bookRate, setBookRate] = useState(0);
  const [rated, setRated] = useState(false);

  const navigation = useNavigation();
  const rateRef = useRef();

  useEffect(() => {
    rateRef.current = note; //do rate refa przy pierwszym odpaleniu komponentu przypisujemy rating z bazy
    rateRef.rated = false; //do rate refa przy pierwszym odpaleniu komponentu przypisujemy rating z bazy
    if (note) setBookRate(note); //jesli jest ocena w bazie zapisz ją w bookRate -będzie wtedy defaultowa
    return () => {
      if (rateRef.rated) updateBookRate(id, rateRef.current); //zapisujemy w bazie rating dopiero przy odmontowywaniu
    };
  }, []);

  const deleteBook = () => {
    if (bookPercent == null) removeToReadBook(id);
    else removeReadNowBook(id);
    navigation.navigate("Home");
  };

  const movetoToRead = () => {
    removeReadNowBook(id);
    removeLastReadID(id);
    addBookToDatabase(id, title, authors, description, thumbnail, pageCount);
  };

  const movetoReadNow = () => {
    addReadNowBook(id, title, authors, description, thumbnail, pageCount);
    removeToReadBook(id);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={{ width: 100, height: 150 }} />
        ) : (
          <Image source={require("../../img/no_cover_book.jpg")} style={{ width: 100, height: 150 }} />
        )}
        {typeof bookPercent == "number" ? (
          <TouchableHighlight style={styles.readPercentage}>
            <View style={styles.readPercentageText}>
              <DefText size={32} color="#fff">
                {bookPercent}%
              </DefText>
            </View>
          </TouchableHighlight>
        ) : null}
        <View style={styles.bookPrimaryInfo}>
          <View>
            <View style={{ marginBottom: 4 }}>
              <DefText family="Rubik-Regular" size={16}>
                {title}
              </DefText>
            </View>

            <DefText family="OpenSans-LightItalic" size={14}>
              {authors}
            </DefText>
          </View>
          {alreadyRead ? (
            <Rating
              startingValue={bookRate}
              tintColor="#f2f2f2"
              ratingCount={10}
              imageSize={24}
              jumpValue={0}
              showRating
              onFinishRating={(val) => {
                rateRef.current = val;
                rateRef.rated = true;
                setBookRate(val);
              }}
            />
          ) : (
            <TouchableHighlight style={styles.readBtn} onPress={() => props.handleBtnClick(name)}>
              <DefText family="OpenSans-LightItalic" size={14} color="#fff">
                {name}
              </DefText>
            </TouchableHighlight>
          )}

          {options && (
            <>
              <TouchableOpacity style={styles.optionsIcon} onPress={() => setOptionsModalVisible(true)}>
                <SimpleLineIcons name="options-vertical" size={16} color="black" />
              </TouchableOpacity>
              <OptionsModal
                visible={optionsModalVisible}
                dismiss={() => {
                  setOptionsModalVisible(false);
                }}
              >
                <View style={[globalSheet.shadowPrimary, styles.modalOptionsContent]}>
                  <TouchableOpacity onPress={() => deleteBook()}>
                    <DefText color="red">Usuń</DefText>
                  </TouchableOpacity>
                  {name == "Czytaj teraz!" ? (
                    <TouchableOpacity onPress={() => movetoToRead()}>
                      <DefText>Przenieś do "Do przeczytania"</DefText>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => movetoReadNow()}>
                      <DefText>Przenieś do "Czytane"</DefText>
                    </TouchableOpacity>
                  )}
                </View>
              </OptionsModal>
            </>
          )}
        </View>
      </View>
      <Link to={{ screen: "EditBook", params: data }} style={styles.link}>
        <AntDesign name="edit" size={16} color={global.primaryColor} />
        <View style={{ marginLeft: 4 }}>
          <DefText size={14} color={global.primaryColor}>
            Edytuj książkę
          </DefText>
        </View>
      </Link>
    </View>
  );
}

LibraryBookDetailsHeader.propTypes = {
  bookPercent: PropTypes.number,
  data: PropTypes.object || PropTypes.array,
  name: PropTypes.string,
  options: PropTypes.bool,
  note: PropTypes.bool,
};

export default LibraryBookDetailsHeader;
const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "rgba(181, 139, 139, 0.05)",
  },
  bookPrimaryInfo: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 24,
  },
  header: {
    height: 150,
    display: "flex",
    flexDirection: "row",
  },
  readBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: global.primaryColor,
  },

  headerBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  readPercentage: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 150,
    backgroundColor: "#000",
    opacity: 0.78,
    zIndex: 2,
  },
  readPercentageText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  link: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    marginBottom: 12,
    paddingTop: 8,
  },
  optionsIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 12,
  },
  modalOptionsContent: {
    position: "absolute",
    top: 108,
    right: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
});

//jesli button ma position absolute powinniśny go dac na koniec parent containera
