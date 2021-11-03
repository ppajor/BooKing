import React from "react";
import { StyleSheet, View, Image, TouchableHighlight } from "react-native";
import { Link } from "@react-navigation/native";
import { global } from "../../styles";
import DefText from "../../components/DefText";
import { AntDesign } from "@expo/vector-icons";

function LibraryBookDetailsHeader({ authors, bookPercent, data, name, thumbnail, title, ...props }) {
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
          <TouchableHighlight style={styles.readBtn} onPress={() => props.handleBtnClick(name)}>
            <DefText family="OpenSans-LightItalic" size={14} color="#fff">
              {name}
            </DefText>
          </TouchableHighlight>
        </View>
      </View>
      <Link to={{ screen: "EditBook", params: data }} style={styles.link}>
        <AntDesign name="edit" size={16} color={global.primaryColor} />
        <View style={{ marginLeft: 4 }}>
          <DefText size={14} color={global.primaryColor}>
            edit book
          </DefText>
        </View>
      </Link>
    </View>
  );
}

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
    paddingVertical: 8,
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
  separator: {
    width: 50,
    height: 2,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: global.primaryColor,
  },

  modalContainer: {
    width: "100%",
    height: 120,
    marginVertical: 24,
    marginHorizontal: 24,
  },
  modalText: {
    color: "#a8a8a8",
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
  headers: {
    marginTop: 32,
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
});
