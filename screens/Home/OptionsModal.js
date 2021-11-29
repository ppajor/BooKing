import React from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import DefText from "../../components/DefText";
import { globalSheet } from "../../styles";

function OptionsModal(props) {
  return (
    <View style={{ position: "absolute", top: 16, right: 0 }}>
      <Modal visible={props.visible} transparent={true} onRequestClose={props.dismiss}>
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        {props.children}
      </Modal>
    </View>
  );
}

export default OptionsModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    margin: "5%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
