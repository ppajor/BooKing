import React, { useEffect } from "react";
import { StyleSheet, View, Text, BackHandler, Image } from "react-native";

export default function BookDetails(props) {
  var image;

  if (props.location.state.cover) {
    image = (
      <Image
        source={{ uri: props.location.state.cover }}
        style={{ width: 120, height: 160 }}
      />
    );
  } else {
    image = (
      <Image
        source={require("./img/no_cover_book.jpg")}
        style={{ width: 75, height: 100 }}
      />
    );
  }

  useEffect(() => {
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
    <View style={{ marginTop: 50 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {image}
        <Text>{props.location.state.title}</Text>
      </View>
      <Text>{props.location.state.description}</Text>
    </View>
  );
}
