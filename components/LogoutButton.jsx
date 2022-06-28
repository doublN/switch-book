
import { Button } from "react-native";

export const LogoutButton = ({ auth }) => {
    return (
        <Button
            onPress={() => auth.signOut()}
            title="Logout"
            color="grey"
            accessibilityLabel="Logout of your account"
        />
    );
};
