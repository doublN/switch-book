import { Button, View, Text } from "react-native";
import BookList from "./BookList"
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

const HomePage = ({ navigation }) => {

  const user = useContext(UserContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
      <BookList />
    </View>
  );
};

export default HomePage;
