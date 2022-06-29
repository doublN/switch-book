import { StyleSheet, View, Button, Text } from "react-native";
import { NavigationEvents } from "react-navigation";

export default function LogInPageScreen({ app, auth, navigation }) {
    return (
        <Button
            title="GO to profile"
            onPress={() =>
                navigation.navigate("CreateProfile", { name: "Tom" })
            }
        ></Button>
    );
}
