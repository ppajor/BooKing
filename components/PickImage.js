import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Entypo } from "@expo/vector-icons";
import DefText from "../components/DefText";
import { globalSheet } from "../styles";

export default function PickImage({ aspect = [2, 3], width = 100, height = 150, ...props }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 0.1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      props.setPath(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        {image ? (
          <View style={[globalSheet.shadowPrimary, { width: width, height: height, marginBottom: 48 }]}>
            <Image source={{ uri: image }} style={{ width: "100%", height: "100%", marginBottom: 48 }} />
          </View>
        ) : (
          <TouchableOpacity onPress={() => pickImage()} style={{ display: "flex", alignItems: "center", marginBottom: 32, height: 200 }}>
            <View style={{ marginBottom: 16 }}>
              <Entypo name="images" size={64} color="#9D9D9D" />
            </View>
            <DefText color="#9D9D9D">Wybierz zdjęcie</DefText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 150,
    marginBottom: 48,
  },
});
