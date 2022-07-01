import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
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
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>SWITCH BOOKS</Text>
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        style={{ margin: 20 }}
      >
        <Image
          source={require("../assets/GoogleSignIn.png")}
          style={styles.signInImage}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

<TouchableOpacity onPress={() => alert("Button pressed")}></TouchableOpacity>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signInImage: {
    width: 200,
    height: 50,
    resizeMode: "contain",
    borderWidth: 5,
    borderColor: "red",
    borderRadius: 20,
  },
});

export default LoginPage;
