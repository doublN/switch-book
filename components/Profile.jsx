import {useContext} from "react";
import { Button, View, Text, Image } from "react-native";
import UserContext from "../Contexts/UserContext"
import { LogoutButton } from "./LogoutButton";

const Profile = ({ navigation }) => {
    const {currentUser, auth} = useContext(UserContext);

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Profile Screen</Text>
            <Image style={{resizeMode:'contain', height: 200, width : 100}} source={{uri : currentUser.selectedImage}} />
            <Text>Welcome {currentUser.username}!</Text>
            <Text>Set location: {currentUser.location}</Text>
            <Button
                title="Edit your profile"
                onPress={() => navigation.navigate("CreateProfile")}
            ></Button>
            <Button
                title="Add a book"
                onPress={() => navigation.navigate("AddABook")}
            ></Button>
            <Button
                title="Find a book"
                onPress={() => navigation.navigate("Navigator" , {screen : "HomePage"})}
            ></Button>
            <LogoutButton auth={auth}/>
        </View>
    );
};
export default Profile;
