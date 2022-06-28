import { Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

export const LoginButton = ({ auth }) => {
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
        }
    }, [response]);

    return (
        <Button
            disabled={!request}
            title="Continue with Google"
            color="#841584"
            onPress={() => {
                promptAsync();
            }}
            accessibilityLabel="Login/signup with your Google account"
        />
    );
};
