import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import BookList from "./components/BookList";
import Header from "./components/Header";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";

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

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <View style={styles.container}>
      <Header />
      <BookList />
      <StatusBar style="auto" />
      {user ? (
        <>
          <Text>User ID: {user.uid}</Text>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const LoginButton = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "731886943527-l30aa53031cmd9t0lmka3or9q9tv3kqg.apps.googleusercontent.com",
    useProxy: true,
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

const LogoutButton = () => {
  return (
    <Button
      onPress={() => auth.signOut()}
      title="Logout"
      color="grey"
      accessibilityLabel="Logout of your account"
    />
  );
};
