import * as React from "react";
import { HeaderBackButton } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import firebase from "firebase";
import { firebaseConfig } from "./firebase-config";
import LoadingScreen from "./screens/Login/LoadingScreen";
import WelcomePage from "./screens/Login/WelcomePage";
import LoginPage from "./screens/Login/LoginPage";
import SignUpEmail from "./screens/Login/SignUpEmail";
import Home from "./screens/Home/Home";
import CurrentReadBookDetails from "./screens/Home/CurrentReadBookDetails";
import LibraryBookDetails from "./screens/Home/LibraryBookDetails";
import BookScanner from "./screens/Home/BookScanner";
import BookDetails from "./screens/Home/BookDetails";
import SearchScreen from "./screens/Search/SearchScreen";
import DefText from "./components/DefText";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig); //musimy sprawdzic czy aplikacja zostala juz zainicjowana czy nie, zeby za kazdym razem nie inicjowac apki
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#B58B8B",
      tabBarInactiveTintColor: "#999",
    })}
  >
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <AntDesign name="search1" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        <Stack.Screen name="BookScanner" component={BookScanner} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen
          name="LibraryBookDetails"
          component={LibraryBookDetails}
          options={{
            headerTitle: (props) => (
              <DefText family="OpenSans-SemiBold" size={20}>
                Book Details
              </DefText>
            ),
          }}
        />
        <Stack.Screen
          name="CurrentReadBookDetails"
          component={CurrentReadBookDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
