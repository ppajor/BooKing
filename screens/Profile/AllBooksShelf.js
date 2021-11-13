import React, { useEffect, useState } from "react";
import DefText from "../../components/DefText";
import { Modal, Alert, FlatList } from "react-native";
import Shelf from "../../components/Shelf";

function AllBooksShelf(props) {
  const { books } = props.route.params;
  //console.log(books);
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

  return <>{data ? <FlatList data={data} keyExtractor={(item, idx) => idx.toString()} renderItem={({ item }) => <Shelf data={item} />} /> : null}</>;
}

export default AllBooksShelf;
