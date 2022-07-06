import { useContext } from "react";
import { Button, View, Text, Image, StyleSheet, Pressable } from "react-native";
import UserContext from "../Contexts/UserContext";
import { LogoutButton } from "./LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles"

const Profile = ({ navigation }) => {
    const { currentUser, auth } = useContext(UserContext);

    return (
        <View>
            <Image
                style={styles.profileImage}
                resizeMode="stretch"
                source={{ uri: currentUser.selectedImage }}
            />
            <View>
                <Text style={styles.bodyProfile}>
                    Welcome, {currentUser.username}!
                </Text>
                <Text style={styles.bodyProfile}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {currentUser.location}
                </Text>
            </View>

            <View>
                <Pressable
                    style={styles.buttonProfile}
                    onPress={() => navigation.navigate("CreateProfile")}
                >
                    <Text styles={styles.text}>Edit your profile</Text>
                </Pressable>
            </View>
            <View style={styles.containerProfile}>
                <Pressable
                    style={styles.buttonProfile}
                    onPress={() => navigation.navigate("AddABook")}
                >
                    <Text styles={styles.buttonProfile}>Offer a book</Text>
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

export default Profile;
