import React, { Component } from "react";
import { NativeRouter, Route, Switch, MemoryRouter } from "react-router-native"; //dzieki memoryrouter mozna uzywać historii w Child componentach, na normalnym routerze historia dziala jedynie w parent componentach

import Home from "./Home";
import BookDetails from "./BookDetails";
import WelcomePage from "./WelcomePage";
import LoadingScreen from "./LoadingScreen";
import LoginPage from "./LoginPage";
import BookScanner from "./BookScanner";
import firebase from "firebase";
import { firebaseConfig } from "./firebase-config";

//import createHistory from "history/createMemoryHistory";
//const history = createHistory();
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig); //musimy sprawdzic czy aplikacja zostala juz zainicjowana czy nie, zeby za kazdym razem nie inicjowac apki

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={LoadingScreen} />
          <Route exact path="/chooseLoginVariant" component={WelcomePage} />
          <Route exact path="/home">
            <Home library={MyLibrary} />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/bookDetails" component={BookDetails} />
          <Route exact path="/bookScanner" component={BookScanner} />
        </Switch>
      </MemoryRouter>
    );
  }
}

const MyLibrary = [
  {
    bookID: "MKfYLfeyrfAAACAAJ",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "2zW3zQEAeyrCAAJ",
    bookImg:
      "http://books.google.com/books/content?id=vglvBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "ydhcbc5eyrx7xch",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "NHE7CQAAyerQBAJ",
    bookImg:
      "http://books.google.com/books/content?id=M3evDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "MKfYLAAACeyrAdAJ",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "NHE7CQAAeryQBAJ",
    bookImg:
      "http://books.google.com/books/content?id=M3evDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
];

//COMMENTS

//dzialajace props.history.push w komponencie:
/*
<Route path="/path" component={MyComponent}>
</Route>
*/

//niedzialajace props.history.push w komponnecie:
/*
<Route path="/path">
 <MyComponent/>
</Route>
*/
