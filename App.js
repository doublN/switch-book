import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { createContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import BookList from "./components/BookList";
import Header from "./components/Header";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
// const firestore = getFirestore(app);

export default function App() {
    const [user] = useAuthState(auth);
    const UserContext = createContext();

    return (
        <UserContext.Provider value={user}>
            <View style={styles.container}>
                <Header />
                <BookList />
                <StatusBar style="auto" />
                {user ? (
                    <>
                        <Text>User ID: {user.uid}</Text>
                        <LogoutButton auth={auth} />
                    </>
                ) : (
                    <LoginButton auth={auth} />
                )}
            </View>
        </UserContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
