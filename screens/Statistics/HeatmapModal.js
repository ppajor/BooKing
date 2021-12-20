import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import DefText from "../../components/DefText";

function HeatmapModal({ visible, ...props }) {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          props.onClose();
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.changeDays(90);
              props.handleHeatmapWidth(Dimensions.get("window").width);
            }}
          >
            <DefText>Ostatnie 90 dni</DefText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.changeDays(180);
              props.handleHeatmapWidth(630);
            }}
          >
            <DefText>Ostatnie 180 dni</DefText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.changeDays(360);
              props.handleHeatmapWidth(1200);
            }}
          >
            <DefText>Ostatnie 360 dni</DefText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default HeatmapModal;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#f2f2f2",
    borderWidth: 2,
    borderColor: "#888",
  },
});
