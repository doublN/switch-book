import * as ImagePicker from "expo-image-picker";
import { createUser, getUserByUid, updateUser } from "../Utils/dbQueries";
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Image,
} from "react-native";
import { useState, useContext } from "react";
import UserContext from "../Contexts/UserContext";

export default function CreateProfileScreen({ navigation }) {
    const [username, onChangeUsername] = useState("");
    const [location, onChangeLocation] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const { currentUser, authorisedUser, setCurrentUser } = useContext(UserContext);

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true
        });

        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage(() => {
            const base64ToUpload = `data:image/jpeg;base64,${pickerResult.base64}`;
            return {base64 : base64ToUpload, uri : pickerResult.uri};
        });
    };

    const handleSubmit = () => {
        if (!currentUser) {
            createUser(username, location, authorisedUser.uid, selectedImage.base64).then(
                () => {
                    getUserByUid(authorisedUser.uid).then((currentUser) => {
                        setCurrentUser(currentUser);
                        navigation.navigate("Navigator");
                    });
                }
            )
        } else {
            updateUser(username, location, authorisedUser.uid, selectedImage.base64).then(
                () => {
                    getUserByUid(authorisedUser.uid).then((currentUser) => {
                        setCurrentUser(currentUser);
                        navigation.navigate("Navigator");
                    });
                }
            );
        }
    };

    return (
        <>
            <View style={styles.view}>
                {selectedImage
                ? <Image
                        source={{uri : selectedImage.uri}}
                        style={styles.thumbnail}
                        ></Image>
                : currentUser && currentUser.selectedImage 
                    ? <Image
                        source={{uri : currentUser.selectedImage}}
                        style={styles.thumbnail}
                    ></Image>
                    : <Image
                        source={require("../assets/defaultAvatar.png")}
                        style={styles.thumbnail}
                        ></Image>
                }
                <Button title={!currentUser ? "Add profile picture" : "Edit profile picture"} onPress={openImagePickerAsync} style={styles.button}/>
                <TextInput
                    style={styles.input}
                    placeholder={!currentUser ? "Enter your Username" : `${currentUser.username}`}
                    onChangeText={onChangeUsername}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder={!currentUser ? "Enter your Location" : `${currentUser.location}`}
                    onChangeText={onChangeLocation}
                ></TextInput>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    view: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    thumbnail: {
        borderRadius: 100,
        width: 300,
        height: 300,
    },
});
