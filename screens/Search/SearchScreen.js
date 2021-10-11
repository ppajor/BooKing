import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import Screen from "../../components/Screen";
import Header from "./Header";
import SearchBar from "./SearchBar";
import HeaderBar from "../../components/HeaderBar";
import Shelf from "../../components/Shelf";

function SearchScreen() {
  return (
    <Screen>
      <ScrollView>
        <Header />
        <SearchBar />
        <HeaderBar
          name="Uwielbiane przez użytkowników"
          image={require("../../img/ulubione2.jpg")}
          iconName="star"
        />
        <Shelf data={books} />
      </ScrollView>
    </Screen>
  );
}

export default SearchScreen;

const books = [
  {
    id: "QBezDwAAQBAJ",
    lastReadPageNumber: 1,
    pageCount: 384,
    thumbnail:
      "http://books.google.com/books/content?id=QBezDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "Harry Potter i Przeklęte Dziecko. Część pierwsza i druga",
    description: "No description",
    authors: "J.K Rowling",
  },
  {
    id: "ThAaBwAAQBAJ",
    lastReadPageNumber: 1,
    pageCount: 337,
    thumbnail:
      "http://books.google.com/books/content?id=ThAaBwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "Harry Potter’s World Wide Influence",
    description: "No description",
    authors: "J.K Rowling",
  },
  {
    id: "thvZDQAAQBAJ",
    lastReadPageNumber: 1,
    pageCount: 287,
    thumbnail:
      "http://books.google.com/books/content?id=thvZDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "The Grey Woman",
    description: "No description",
    authors: "J.K Rowling",
  },
  {
    id: "ogQn-L-66FYC",
    lastReadPageNumber: 1,
    pageCount: 249,
    thumbnail:
      "http://books.google.com/books/content?id=ogQn-L-66FYC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    title: "Potter's Field",
    description: "No description",
    authors: "J.K Rowling",
  },
];
