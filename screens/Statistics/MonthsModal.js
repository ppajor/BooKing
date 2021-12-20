import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import DefText from "../../components/DefText";

function MonthsModal({ visible, ...props }) {
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
              props.changeStartTime(3);
              props.handleChartWidth(Dimensions.get("window").width);
            }}
          >
            <DefText>Ostatnie 4 miesiące</DefText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.changeStartTime(5);
              props.handleChartWidth(Dimensions.get("window").width);
            }}
          >
            <DefText>Ostatnie 6 miesięcy</DefText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.changeStartTime(11);
              props.handleChartWidth(750);
            }}
          >
            <DefText>Ostatnie 12 miesięcy</DefText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default MonthsModal;

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
