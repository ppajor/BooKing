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
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/bookDetails" component={BookDetails} />
          <Route exact path="/bookScanner" component={BookScanner} />
        </Switch>
      </MemoryRouter>
    );
  }
}

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
