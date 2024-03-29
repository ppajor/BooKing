import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, BackHandler } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getData, bookData } from "../../api/GoogleBooksCalls";
import { addBookToDatabase } from "../../api/firebaseCalls";

export default function BookScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const API_KEY = "AIzaSyACLJEKxGoXNM8qfeNKejGzzhESdRo6e00";

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu usuwamy event listenera
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    console.log("HANDLE BARCODE");
    setScanned(true);
    const result = await getData(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data}&key=${API_KEY}`);
    const book = result.items[0];

    navigation.push("EditBook", bookData(book));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,1)",
      }}
    >
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />

      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
      <TouchableOpacity style={styles.exit} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.x}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  exit: {
    position: "absolute",
    right: 25,
    top: 25,
    zIndex: 3,
  },
  x: {
    fontSize: 25,
    color: "#fff",
  },
});
