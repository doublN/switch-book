import * as Sharing from "expo-sharing";

import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";

import { StyleSheet, View, Button, Text } from "react-native";
import BookList from "./components/BookList";
import Header from "./components/Header";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import LogInPageScreen from "./components/LogInPageScreen";
import AddABook from "./components/AddABook";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore } from "firebase/firestore";

//Navigation
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateProfileScreen from "./components/CreateProfileScreen";

const firebaseConfig = {
    apiKey: "AIzaSyC15hpnCra3iuHNw9q1gbxerBHY5MZalEA",
    authDomain: "switchbook-225b3.firebaseapp.com",
    projectId: "switchbook-225b3",
    storageBucket: "switchbook-225b3.appspot.com",
    messagingSenderId: "731886943527",
    appId: "1:731886943527:web:af3ffaf1fd4932b30cfd02",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// const firestore = getFirestore(app);

//Navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
    const [user] = useAuthState(auth);
    const UserContext = createContext();
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LogIn" component={LogInPageScreen} />
                    <Stack.Screen name="InnerNavigation" component={HomePage} />
                    <Stack.Screen
                        name="CreateProfile"
                        component={CreateProfileScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
