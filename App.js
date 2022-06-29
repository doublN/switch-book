import Header from "./components/Header";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import AddABook from "./components/AddABook";
import UserContext from "./Contexts/UserContext";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./Utils/firebase";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./Utils/dbQueries";

//Navigation
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [authorisedUser] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // set currentUser (available to all components via context)
    if (authorisedUser) {
      getCurrentUser(authorisedUser).then((currentUser) => {
        setCurrentUser(currentUser);
      });
    }
  }, [authorisedUser]);

  if (authorisedUser === null) {
    return <LoginPage auth={auth} />;
  } else {
    return (
      <UserContext.Provider value={{ currentUser }}>
        <Header />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="AddABook" component={AddABook} />
          </Stack.Navigator>
        </NavigationContainer>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}
