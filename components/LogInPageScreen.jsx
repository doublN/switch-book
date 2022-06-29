import { StyleSheet, View, Button, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import Navigator from "./Navigator";
import { useState } from "react";

export default function LogInPageScreen({ app, auth, navigation }) {
  const [user, setUser] = useState(false);

  return (
    <>
      <Button
        title="Create Profile"
        onPress={() =>
          navigation.navigate(`${user ? "Navigation" : "CreateProfile"}`)
        }
      ></Button>
    </>
  );
}
