import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

export default function Screen(props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
});
