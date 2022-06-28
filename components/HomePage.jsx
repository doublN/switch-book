import { Button, View, Text } from "react-native";
import BookList from "./BookList"

const HomePage = ({ navigation }) => {

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Current user ID...</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
      <BookList />
    </View>
  );
};

export default HomePage;
