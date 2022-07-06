import {SafeAreaView,Text,TouchableOpacity,Image,KeyboardAvoidingView} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import {
  useFonts,
  Avenir,
} from "@expo-google-fonts/dev";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "./styles"

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
         <KeyboardAvoidingView
        behavior="position"
        enabled={true}
        keyboardVerticalOffset={44}
      >
      <Text style={styles.titleFp}>SWITCH BOOK</Text>
      <Image style={styles.imageFp}
          source={{uri:'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'}}></Image>
      <Text style={styles.bodyFp}>Sign in with </Text>
      
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        style={styles.icons}>
        <FontAwesomeIcon icon={faFacebook}/>
        <FontAwesomeIcon icon={faGoogle}/>
        <FontAwesomeIcon icon={faTwitter}/>
             </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;
