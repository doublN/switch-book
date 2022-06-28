import * as React from "react";
import { Button, View, Text } from "react-native";

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
