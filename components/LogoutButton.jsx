import { StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC15hpnCra3iuHNw9q1gbxerBHY5MZalEA",
  authDomain: "switchbook-225b3.firebaseapp.com",
  projectId: "switchbook-225b3",
  storageBucket: "switchbook-225b3.appspot.com",
  messagingSenderId: "731886943527",
  appId: "1:731886943527:web:af3ffaf1fd4932b30cfd02",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const LogoutButton = () => {
  return (
    <View>
      <Button
        onPress={() => auth.signOut()}
        title="Logout"
        color="grey"
        accessibilityLabel="Logout of your account"
      />
    </View>
  );
};

export default LogoutButton;
