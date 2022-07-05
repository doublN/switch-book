import LoginPage from "./components/LoginPage";
import UserContext from "./Contexts/UserContext";
import SingleBookScreen from "./components/SingleBookScreen";
import OtherUserScreen from "./components/OtherUserScreen";
import ChatScreen from "./components/ChatScreen";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Utils/firebase";
import { useState, useEffect } from "react";
import { getUserByUid } from "./Utils/dbQueries";

//Navigation
import Navigator from "./components/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateProfileScreen from "./components/CreateProfileScreen";
import AddABookScreen from "./components/AddABookScreen";
import { OfferBookScreen } from "./components/OfferBookScreen";
//Navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
    // authorisedUser = user in authentication database
    // currentUser = user in our firestore database
    const [authorisedUser] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // set currentUser (available to all components via context)
        if (authorisedUser) {
            getUserByUid(authorisedUser.uid).then((currentUser) => {
                setCurrentUser(currentUser);
            });
        }
    }, [authorisedUser]);

  if (!authorisedUser) {
    return <LoginPage auth={auth} />;
  } else if (!currentUser) {
    return (
      <UserContext.Provider
        value={{ currentUser, authorisedUser, setCurrentUser, auth }}
      >
        <CreateProfileScreen />
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider
        value={{ currentUser, authorisedUser, setCurrentUser, auth }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={"Navigator"} component={Navigator} />
            <Stack.Screen
              name={"CreateProfile"}
              component={CreateProfileScreen}
            />
            <Stack.Screen
              name="SingleBookScreen"
              component={SingleBookScreen}
            />
            <Stack.Screen name="OtherUserScreen" component={OtherUserScreen} />
            <Stack.Screen name="AddABook" component={AddABookScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}