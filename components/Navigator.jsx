import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import HomePageScreen from "./HomePageScreen";
import InteractionsScreen from "./InteractionsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBook,
    faUserGear,
    faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigator = ({ route }) => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomePageScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesomeIcon icon={faBook} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesomeIcon icon={faUserGear} />
                    ),
                }}
            />
            <Tab.Screen
                name="Interactions"
                component={InteractionsScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Navigator;
