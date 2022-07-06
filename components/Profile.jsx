import { useContext } from "react";
import { Button, View, Text, Image, StyleSheet, Pressable } from "react-native";
import UserContext from "../Contexts/UserContext";
import { LogoutButton } from "./LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Exo_100Thin, Rowdies_700Bold } from "@expo-google-fonts/dev";

const Profile = ({ navigation }) => {
    const { currentUser, auth } = useContext(UserContext);

    return (
        <View>
            <Image
                style={styles.imageFp}
                resizeMode="stretch"
                source={{ uri: currentUser.selectedImage }}
            />
            <View>
                <Text style={styles.body}>
                    Welcome, {currentUser.username}!
                </Text>
                <Text style={styles.body}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {currentUser.location}
                </Text>
            </View>

            <View>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("CreateProfile")}
                >
                    <Text styles={styles.text}>Edit your profile</Text>
                </Pressable>
            </View>
            <View style={styles.container}>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("AddABook")}
                >
                    <Text styles={styles.text}>Offer a book</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("Navigator", { screen: "Home" })
                    }
                >
                    <Text styles={styles.body}>Request a book</Text>
                </Pressable>
            </View>
            <LogoutButton auth={auth} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
    },
    profileImage: {
        width: "100%",
        height: 350,
    },
    body: {
        fontFamily: "Avenir",
        fontSize: 15,
        padding: 5,
        justifyContent: "center",
        textAlign: "center",
        color: "#333333",
    },
    button: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 22,
        margin: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#dddddd",
    },
    imageFp: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 18000,
        width: 300,
        height: 300,
    },
});
export default Profile;
