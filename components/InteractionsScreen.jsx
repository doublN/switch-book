import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RequestsScreen from "./RequestsScreen";
import OffersScreen from "./OffersScreen";

const Tab = createMaterialTopTabNavigator();

export default function InteractionsScreen({ navigation }) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="My Requests"
                component={RequestsScreen}
                navigation={navigation}
            />
            <Tab.Screen
                name="Offer this book"
                component={OffersScreen}
                navigation={navigation}
            />
        </Tab.Navigator>
    );
}
