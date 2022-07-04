import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,KeyboardAvoidingView,
  View
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import {
  useFonts,
  Avenir,
} from "@expo-google-fonts/dev";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";


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
        style={styles.keyboardAvoidingView4I}
        behavior="position"
        enabled={true}
        keyboardVerticalOffset={44}
      >
      <Text style={styles.title}>SWITCH BOOK</Text>
      <Image style={styles.imageFp}
          source={{uri:'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'}}></Image>
      <Text style={styles.body}>Sign in</Text>
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddddd",
  },
  icons: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  imageFp: {
    marginBottom: 100,
    height: 280,
    width: 280,
    borderRadius: 1800
  },
  title:{
    fontFamily:"Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#423034",

      },
  body:{
    fontFamily:"Avenir",
    fontSize: 15,
    textAlign: "center",
    color: "#423034",
      }
});

export default LoginPage;
