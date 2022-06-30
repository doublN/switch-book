import { Button, View, Text } from "react-native";
import BookList from "./BookList";
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

const HomePageScreen = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);

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
