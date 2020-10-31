import React, { useEffect } from "react";
import { StyleSheet, View, Text, BackHandler } from "react-native";

export default function BookDetails(props) {
  useEffect(() => {
    console.log(props.location.state);

    const backAction = () => {
      props.history.push("/Home"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  return (
    <View>
      <Text>{props.location.state.title}</Text>
    </View>
  );
}
