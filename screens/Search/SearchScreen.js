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
import SearchResults from "./SearchResults";
import HeaderBar from "../../components/HeaderBar";
import Shelf from "../../components/Shelf";

function SearchResult() {
  return (
    <Screen>
      <ScrollView>
        <Header />
        <SearchResults />
        <HeaderBar
          name="Uwielbiane przez użytkowników"
          image={require("../../img/ulubione2.jpg")}
          iconName="star"
        />
        <Shelf data={books.items} />
      </ScrollView>
    </Screen>
  );
}

export default SearchResult;

const books = {
  kind: "books#volumes",
  totalItems: 329,
  items: [
    {
      kind: "books#volume",
      id: "8Pr_kLFxciYC",
      etag: "ytdKw5QPd24",
      selfLink: "https://www.googleapis.com/books/v1/volumes/8Pr_kLFxciYC",
      volumeInfo: {
        title: "Flowers For Algernon",
        subtitle: "A Modern Literary Classic",
        authors: ["Daniel Keyes"],
        publisher: "Hachette UK",
        publishedDate: "2012-11-15",
        description:
          "The classic novel about a daring experiment in human intelligence Charlie Gordon, IQ 68, is a floor sweeper and the gentle butt of everyone's jokes - until an experiment in the enhancement of human intelligence turns him into a genius. But then Algernon, the mouse whose triumphal experimental transformation preceded his, fades and dies, and Charlie has to face the possibility that his salvation was only temporary.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9780575088498",
          },
          {
            type: "ISBN_10",
            identifier: "0575088494",
          },
        ],
        readingModes: {
          text: true,
          image: false,
        },
        pageCount: 224,
        printType: "BOOK",
        categories: ["Fiction"],
        averageRating: 5,
        ratingsCount: 5,
        maturityRating: "NOT_MATURE",
        allowAnonLogging: true,
        contentVersion: "0.14.17.0.preview.2",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=8Pr_kLFxciYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=8Pr_kLFxciYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=8Pr_kLFxciYC&printsec=frontcover&dq=flowers+inauthor:keyes&hl=&cd=1&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=8Pr_kLFxciYC&source=gbs_api",
        canonicalVolumeLink:
          "https://play.google.com/store/books/details?id=8Pr_kLFxciYC",
      },
      saleInfo: {
        country: "PL",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 32.99,
          currencyCode: "PLN",
        },
        retailPrice: {
          amount: 32.99,
          currencyCode: "PLN",
        },
        buyLink:
          "https://play.google.com/store/books/details?id=8Pr_kLFxciYC&rdid=book-8Pr_kLFxciYC&rdot=1&source=gbs_api",
        offers: [
          {
            finskyOfferType: 1,
            listPrice: {
              amountInMicros: 32990000,
              currencyCode: "PLN",
            },
            retailPrice: {
              amountInMicros: 32990000,
              currencyCode: "PLN",
            },
          },
        ],
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink:
            "http://books.google.pl/books/download/Flowers_For_Algernon-sample-epub.acsm?id=8Pr_kLFxciYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=8Pr_kLFxciYC&hl=&printsec=frontcover&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "The classic novel about a daring experiment in human intelligence Charlie Gordon, IQ 68, is a floor sweeper and the gentle butt of everyone&#39;s jokes - until an experiment in the enhancement of human intelligence turns him into a genius.",
      },
    },
    {
      kind: "books#volume",
      id: "gK98gXR8onwC",
      etag: "s4sV26zVNU4",
      selfLink: "https://www.googleapis.com/books/v1/volumes/gK98gXR8onwC",
      volumeInfo: {
        title: "Flowers for Algernon",
        subtitle: "A One-act Play",
        authors: ["David Rogers", "Daniel Keyes"],
        publisher: "Dramatic Publishing",
        publishedDate: "1969",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "0871293870",
          },
          {
            type: "ISBN_13",
            identifier: "9780871293879",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 32,
        printType: "BOOK",
        categories: ["American drama"],
        averageRating: 5,
        ratingsCount: 1,
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "0.1.2.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=gK98gXR8onwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=gK98gXR8onwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.pl/books?id=gK98gXR8onwC&printsec=frontcover&dq=flowers+inauthor:keyes&hl=&cd=8&source=gbs_api",
        infoLink:
          "http://books.google.pl/books?id=gK98gXR8onwC&dq=flowers+inauthor:keyes&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/Flowers_for_Algernon.html?hl=&id=gK98gXR8onwC",
      },
      saleInfo: {
        country: "PL",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "PL",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=gK98gXR8onwC&hl=&printsec=frontcover&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
    },
  ],
};
