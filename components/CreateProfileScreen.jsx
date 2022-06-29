import * as ImagePicker from "expo-image-picker";

import {
    View,
    TextInput,
    StyleSheet,
    Button,
    TouchableHighlight,
    Image,
} from "react-native";
import { useState } from "react";

export default function CreateProfileScreen() {
    const [username, onChangeUsername] = useState("");
    const [location, onChangeLocation] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    if (selectedImage !== null) {
        return (
            <View>
                <Image source={{ uri: selectedImage.localUri }} />
            </View>
        );
    }

    return (
        <>
            <View>
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
                <Button title="Submit" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
