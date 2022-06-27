import * as React from "react";
import { Button, View, Text } from "react-native";
import { NativationContainer } from '"react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};
export default Profile;
