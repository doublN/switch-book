import * as React from "react";
import { Button, View, Text } from "react-native";
import { NativationContainer } from '"react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomePage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
    </View>
  );
};

export default HomePage;
