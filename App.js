import * as React from "react";
import { HeaderBackButton } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import firebase from "./firebase-config";
import { firebaseConfig } from "./firebase-config";
import LoadingScreen from "./screens/Login/LoadingScreen";
import WelcomePage from "./screens/Login/WelcomePage";
import LoginPage from "./screens/Login/LoginPage";
import SignUpEmail from "./screens/Login/SignUpEmail";
import Home from "./screens/Home/Home";
import LibraryBookDetails from "./screens/Home/LibraryBookDetails";
import BookScanner from "./screens/Home/BookScanner";

import SearchScreen from "./screens/Search/SearchScreen";
import DefText from "./components/DefText";
import EditBook from "./screens/Home/EditBook";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import FriendProfile from "./screens/Profile/FriendProfile";
import AddReview from "./screens/Home/AddReview";
import AllBooksShelf from "./screens/Profile/AllBooksShelf";
import { LogBox } from "react-native";
import StatsScreen from "./screens/Statistics/StatsScreen";

//if  (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

//musimy sprawdzic czy aplikacja zostala juz zainicjowana czy nie, zeby za kazdym razem nie inicjowac apki
const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const StatsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator initialRouteName="LoadingScreen">
      <LoginStack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
      <LoginStack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }} />
      <LoginStack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      <LoginStack.Screen name="SignUpEmail" component={SignUpEmail} options={{ headerShown: false }} />
    </LoginStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
      <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddReview" component={AddReview} options={{ title: "Dodaj recenzję" }} />
      <SearchStack.Screen name="EditBook" component={EditBook} options={{ title: "Edycja książki" }} />
      <HomeStack.Screen name="AllBooksShelf" component={AllBooksShelf} options={{ title: "Wszystkie książki" }} />
      <HomeStack.Screen name="LibraryBookDetails" component={LibraryBookDetails} options={{ title: "Informacje o książce" }} />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator initialRouteName="SearchScreen">
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
      <SearchStack.Screen name="EditBook" component={EditBook} />
      <SearchStack.Screen name="LibraryBookDetails" component={LibraryBookDetails} options={{ title: "Informacje o książce" }} />
      <HomeStack.Screen name="BookScanner" component={BookScanner} options={{ headerShown: false }} />
    </SearchStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="AllBooksShelf" component={AllBooksShelf} options={{ title: "Wszystkie książki" }} />
      <ProfileStack.Screen name="EditBook" component={EditBook} options={{ title: "Edytuj książkę" }} />
      <ProfileStack.Screen name="LibraryBookDetails" component={LibraryBookDetails} options={{ title: "Informacje o książce" }} />
      <ProfileStack.Screen name="FriendProfile" component={FriendProfile} options={{ title: "Informacje o profilu" }} />
    </ProfileStack.Navigator>
  );
}

function StatsStackNavigator() {
  return (
    <StatsStack.Navigator initialRouteName="StatsScreen">
      <StatsStack.Screen name="StatsScreen" component={StatsScreen} options={{ headerShown: false }} />
      <StatsStack.Screen name="AllBooksShelf" component={AllBooksShelf} options={{ title: "Wszystkie książki" }} />
    </StatsStack.Navigator>
  );
}

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: "#fff", paddingBottom: 2 },
      tabBarActiveTintColor: "#B58B8B",
      tabBarInactiveTintColor: "#c9c9c9",
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStackNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Statistics"
      component={StatsStackNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <AntDesign name="linechart" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

function App() {
  React.useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  }, []);

  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}

export default App;
