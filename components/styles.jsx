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
    left: {
        textAlign: "left",
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
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    profileImageSmall: {
        height: 70,
        width: 70,
        borderRadius: 70,
        margin: 10,
        marginRight: 20
    },
    button: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 22,
        margin: 10,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: "#dddddd",
    },
    desc: {
        fontFamily: "Avenir",
        fontSize: 15,
        textAlign: "center",
        color: "#333333",
        padding:30,
        paddingBottom: 10,
        textAlign:'justify',
    },
    title:{
        fontFamily:"Avenir",
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: "center",
        color: "#333333",
        paddingTop: 20,
        paddingHorizontal: 20
          },
});
