import React, { Component } from "react";
import { NativeRouter, Route, Switch, MemoryRouter } from "react-router-native"; //dzieki memoryrouter mozna uzywać historii w Child componentach, na normalnym routerze historia dziala jedynie w parent componentach

import Home from "./screens/Home/Home";
import BookDetails from "./screens/Home/BookDetails";
import WelcomePage from "./screens/Login/WelcomePage";
import LoadingScreen from "./screens/Login/LoadingScreen";
import LoginPage from "./screens/Login/LoginPage";
import SignUpEmail from "./screens/Login/SignUpEmail";
import BookScanner from "./screens/Home/BookScanner";
import LibraryBookDetails from "./screens/Home/LibraryBookDetails";
import CurrentReadBookDetails from "./screens/Home/CurrentReadBookDetails";
import firebase from "firebase";
import { firebaseConfig } from "./firebase-config";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]); //pozbywa sie niepotrzebnych warningow o jakims timerze

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
          <Route exact path="/signupEmail" component={SignUpEmail} />
          <Route exact path="/bookDetails" component={BookDetails} />
          <Route
            exact
            path="/libraryBookDetails"
            component={LibraryBookDetails}
          />
          <Route exact path="/bookScanner" component={BookScanner} />
          <Route
            exact
            path="/currentReadBookDetails"
            component={CurrentReadBookDetails}
          />
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
