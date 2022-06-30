
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import HomePageScreen from "./HomePageScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigator({ route }) {
    return (
        <>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="HomePage" component={HomePageScreen} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </>
    );
}
