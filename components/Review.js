import React from "react";
import DefText from "./DefText";
import { View, StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

function Review({ data }) {
  return (
    <View>
      <View style={styles.reviewHeader}>
        <View style={styles.avatar}></View>
        <View>
          <DefText family="Rubik-Medium" size={14}>
            {data.title}
          </DefText>
          <DefText family="Rubik-Light" size={12} color="rgba(0,0,0,0.5)">
            {data.author}
          </DefText>
        </View>
        <View style={styles.rateReview}>
          <AntDesign name="like1" size={16} color="#2FC035" />
          <AntDesign name="dislike1" size={16} color="#DB1A1A" style={{ marginLeft: 8 }} />
        </View>
      </View>
      <View style={{ width: "100%", height: "60%", overflow: "hidden" }}>
        <DefText family="OpenSans-Light" size={14} color="rgba(0,0,0,0.75)">
          {data.content}
        </DefText>
      </View>

      <View style={styles.bookNote}>
        <DefText family="Rubik-Medium" size={11}>
          Ocena książki:
        </DefText>
        <FontAwesome name="star" size={16} color="orange" style={{ marginLeft: 8, marginRight: 4 }} />
        <DefText size={14}>{data.note}</DefText>
      </View>
    </View>
  );
}

export default Review;

const styles = StyleSheet.create({
  reviewHeader: { display: "flex", flexDirection: "row", width: "100%", height: "25%" },
  avatar: { width: 40, height: 40, marginRight: 12, backgroundColor: "#A8A8A8", borderRadius: 4 },
  rateReview: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  bookNote: { display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "15%" },
});
