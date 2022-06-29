import * as React from "react";
import { Button, View, Text, Image } from "react-native";

const Profile = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Profile Screen</Text>
            <Image></Image>
            <Text>username</Text>
            <Text>location</Text>
            <Button
                title="Add a book"
                onPress={() => navigation.navigate("AddABook")}
            ></Button>
            <Button
                title="Request a book"
                onPress={() => navigation.navigate("BookList")}
            ></Button>
        </View>
    );
};
export default Profile;
