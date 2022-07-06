import { StyleSheet } from "react-native";

export default StyleSheet.create({
    ScrollView: { padding: 30 },
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderRadius: 30,
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#423034",
        backgroundColor: "#ffffff",
        borderRadius: 30,
    },
    body: {
        fontFamily: "Avenir",
        fontSize: 15,
        textAlign: "center",
        color: "#333333",
    },
    image: {
        resizeMode: "contain",
        height: 300,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 50,
        borderRadius: 30,
    },
    profileImage: {
        resizeMode: "contain",
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 22,
        margin: 10,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: "#dddddd",
    },
  });