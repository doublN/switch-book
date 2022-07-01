import * as ImagePicker from "expo-image-picker";
import { createUser, getUserByUid } from "../Utils/dbQueries";
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    TouchableHighlight,
    Image,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";

export default function CreateProfileScreen({ navigation }) {
    const [username, onChangeUsername] = useState("");
    const [location, onChangeLocation] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const { authorisedUser, setCurrentUser } = useContext(UserContext);

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage(() => {
            const base64ToUpload = `data:image/jpeg;base64,${pickerResult.base64}`;
            return base64ToUpload;
        });
    };

    const handleSubmit = () => {
        createUser(username, location, authorisedUser.uid, selectedImage).then(
            () => {
                getUserByUid(authorisedUser.uid).then((currentUser) => {
                    setCurrentUser(currentUser);
                    navigation.navigate("Navigator");
                });
            }
        );
    };

    return (
        <>
            <View style={styles.view}>
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.thumbnail}
                    ></Image>
                ) : null}
                <Button title="Add photo" onPress={openImagePickerAsync} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Username"
                    onChangeText={onChangeUsername}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Location"
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
