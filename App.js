import React, { Component } from "react";
import { NativeRouter, Route, Switch, MemoryRouter } from "react-router-native"; //dzieki memoryrouter mozna uzywać historii w Child componentach, na normalnym routerze historia dziala jedynie w parent componentach

import Home from "./Home";
import BookDetails from "./BookDetails";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
//import createHistory from "history/createMemoryHistory";

//const history = createHistory();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route exact path="/home">
            <Home library={MyLibrary} />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/bookDetails" component={BookDetails} />
        </Switch>
      </MemoryRouter>
    );
  }
}

const MyLibrary = [
  {
    bookID: "MKfYLAAACAAJ",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "2zW3zQEACAAJ",
    bookImg:
      "http://books.google.com/books/content?id=vglvBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "ydhcbc56x7xch",
    bookImg:
      "http://books.google.com/books/content?id=NHE7CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookID: "NHE7CQAAQBAJ",
    bookImg:
      "http://books.google.com/books/content?id=M3evDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
];
