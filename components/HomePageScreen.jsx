import * as React from "react";
import { Button, View, Text } from "react-native";
import BookList from "./BookList";

const HomePageScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Create Profile"
        onPress={() => navigation.navigate("CreateProfile", { name: "Tom" })}
      ></Button>
      <BookList />
    </View>
  );
};

export default HomePageScreen;
