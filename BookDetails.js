import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function BookDetails(props) {
  useEffect(() => {
    console.log("component mounted");
  }, []);

  return <Text>WELCOME TO BOOK DETAILS!</Text>;
}
