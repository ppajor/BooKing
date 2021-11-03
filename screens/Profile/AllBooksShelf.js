import React, { useEffect, useState } from "react";
import DefText from "../../components/DefText";
import { Modal, Alert, FlatList } from "react-native";
import Shelf from "../../components/Shelf";

function AllBooksShelf(props) {
  const { booksToRead } = props.route.params;
  console.log(booksToRead);
  const [data, setData] = useState(null);

  useEffect(() => {
    var licznik = 1;
    var object = {};
    var array = [];
    var items = Object.keys(booksToRead).length;
    for (const property in booksToRead) {
      object[property] = booksToRead[property];

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
