import { Button, View, Text } from "react-native";
import BookList from "./BookList"
import { useContext } from "react";
import FirebaseContext from ".FirebaseContext./Contexts/FirebaseContext";

const HomePage = ({ navigation }) => {

  const {user} = useContext(FirebaseContext);

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
