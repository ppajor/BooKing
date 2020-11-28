import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image,
  TouchableHighlight,
} from "react-native";

export default function LibraryBookDetails(props) {
  var image;

  if (props.location.state.data.thumbnail) {
    image = (
      <Image
        source={{ uri: props.location.state.data.thumbnail }}
        style={{ width: 100, height: 150 }}
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

    return () => backHandler.remove(); // przy odmontowywaniu trzeba posprzątac
  }, []);

  return (
    <View style={{ marginTop: 50 }}>
      <View style={styles.container}>
        {image}
        <View>
          <Text>{props.location.state.data.title}</Text>
          <TouchableHighlight style={styles.readBtn}>
            <Text style={styles.readBtnText}>Czytaj </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  readBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 34,
    backgroundColor: "dodgerblue",
  },
  readBtnText: {
    color: "#fff",
  },
});
