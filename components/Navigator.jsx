
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import BookList from "./BookList";

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
