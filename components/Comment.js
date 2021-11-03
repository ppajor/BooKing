import React from "react";
import DefText from "./DefText";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function Comment({ data, separator = true }) {
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", marginBottom: 16 }}>
        <View style={{ width: 40, height: 40, marginRight: 12, backgroundColor: "#A8A8A8", borderRadius: 4 }}></View>
        <View>
          <DefText family="Rubik-Medium" size={14}>
            {data.author}
          </DefText>
          <DefText family="Rubik-Light" size={12} color="rgba(0,0,0,0.5)">
            5 minutes ago
          </DefText>
        </View>
        <View style={{ position: "absolute", top: 0, right: 0, display: "flex", flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="star" size={16} color="orange" />
          <View style={{ marginLeft: 4 }}>
            <DefText size={14}>{data.note}</DefText>
          </View>
        </View>
      </View>
      <DefText family="OpenSans-Light" size={14} color="rgba(0,0,0,0.75)">
        {data.content}
      </DefText>
      {separator && <View style={styles.separator} />}
    </View>
  );
}

export default Comment;

const styles = StyleSheet.create({
  separator: { width: "100%", height: 1, marginBottom: 16, marginTop: 36, backgroundColor: "#f1f1f1" },
});
