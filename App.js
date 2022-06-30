import LoginPage from "./components/LoginPage";
import UserContext from "./Contexts/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Utils/firebase";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./Utils/dbQueries";

//Navigation
import Navigator from "./components/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateProfileScreen from "./components/CreateProfileScreen";

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
      getCurrentUser(authorisedUser).then((currentUser) => {
        setCurrentUser(currentUser);
      });
    }
  }, [authorisedUser]);

  if (authorisedUser === null) {
    return <LoginPage auth={auth} />;
  } else {
    return (
      <UserContext.Provider
        value={{ currentUser, authorisedUser, setCurrentUser }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={!currentUser ? "CreateProfile" : "Navigator"}
              component={!currentUser ? CreateProfileScreen : Navigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}
