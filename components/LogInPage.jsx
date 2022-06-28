
import { StyleSheet, Button, SafeAreaView } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

const LoginPage = ({ auth }) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            "731886943527-l30aa53031cmd9t0lmka3or9q9tv3kqg.apps.googleusercontent.com",
        useProxy: true,
        redirectUri: "https://auth.expo.io/@mmysore/switch-book",
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        } else {
            console.log(response);
        }
    }, [response]);

    return (
        <SafeAreaView style={styles.container}>
            <Button
                disabled={!request}
                title="Continue with Google"
                color="#841584"
                onPress={() => {
                    promptAsync();
                }}
                accessibilityLabel="Login/signup with your Google account"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default LoginPage