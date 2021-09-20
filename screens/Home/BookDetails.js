import React, { useEffect } from "react";
import { StyleSheet, View, Text, BackHandler, Image } from "react-native";

export default function BookDetails({ navigation, route }) {
  var image;

  if (route.params.cover) {
    image = (
      <Image
        source={{ uri: route.params.cover }}
        style={{ width: 120, height: 160 }}
      />
    );
  } else {
    image = (
      <Image
        source={require("../../img/no_cover_book.jpg")}
        style={{ width: 75, height: 100 }}
      />
    );
  }

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home");
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
        <Text>{route.params.title}</Text>
      </View>
      <Text>{route.params.description}</Text>
    </View>
  );
}
