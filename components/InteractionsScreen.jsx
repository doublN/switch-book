import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestsScreen from './RequestsScreen';
import OffersScreen from './OffersScreen';

const Tab = createMaterialTopTabNavigator();

export default function InteractionsScreen() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Requested" component={RequestsScreen} />
          <Tab.Screen name="Offered" component={OffersScreen} />
        </Tab.Navigator>
      );
}