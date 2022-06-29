import { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Button, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateProfileScreen from "./CreateProfileScreen";
import Profile from "./Profile";
import LogInPageScreen from "./LogInPageScreen";
import BookList from "./BookList";

import * as Sharing from "expo-sharing";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigator({ route }) {
    return (
        <>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="BookList" component={BookList} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </>
    );
}
