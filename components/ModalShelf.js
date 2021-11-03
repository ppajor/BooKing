import React, { useEffect, useState } from "react";
import DefText from "./DefText";
import { Modal, Alert, FlatList } from "react-native";
import Shelf from "./Shelf";

function ModalShelf({ books, modalVisible, ...props }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    var licznik = 1;
    var object = {};
    var array = [];
    var items = Object.keys(books).length;
    for (const property in books) {
      object[property] = books[property];

      if (licznik % 4 == 0 || licznik == items) {
        array.push(object);
        object = {};
      }

      licznik++;
    }
    console.log("ARRAY");
    setData(array);
  }, []);

  return (
    <>
      {data ? (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            props.setModalVisible(!modalVisible);
          }}
        >
          <FlatList data={data} keyExtractor={(item, idx) => idx.toString()} renderItem={({ item }) => <Shelf data={item} />} />
        </Modal>
      ) : null}
    </>
  );
}

export default ModalShelf;
