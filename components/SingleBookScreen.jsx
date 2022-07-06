import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    ScrollView,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useState, useContext, useLayoutEffect } from "react";
import {
    getSwapsByIsbn,
    getUserByUid,
    updateSwapById,
} from "../Utils/dbQueries";
import UserContext from "../Contexts/UserContext";

export default function SingleBookScreen({ route, navigation }) {
    const { book } = route.params;
    const [offerInfo, setOfferInfo] = useState([]);
    const [request, setRequest] = useState(false);
    const { currentUser } = useContext(UserContext);

    useLayoutEffect(() => {
        async function mergeQueries() {
            try {
                const dbSwaps = await getSwapsByIsbn(book.isbn);
                const users = await Promise.all(
                    dbSwaps.map((swap) => getUserByUid(swap.offeredBy))
                );
                let mergedArray = [];

                for (let i = 0; i < users.length; i++) {
                    if (users[i].uid !== currentUser.uid) {
                        mergedArray.push({ ...users[i], ...dbSwaps[i] });
                    }
                }
                setOfferInfo(mergedArray);
                setRequest(false);
            } catch (err) {
                console.log(err);
            }
        }
        mergeQueries();
    }, [request]);

    function handleRequest(swapId) {
        updateSwapById(swapId, currentUser.uid, "requested")
            .then(() => {
                Alert.alert(
                    "Request sent!",
                    "The user has been notified and will contact you soon",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("ok Pressed"),
                            style: "cancel",
                        },
                    ]
                );
            })
            .catch((err) => {
                console.log(err);
            });
        setRequest(true);
    }

    return (
        <View>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={{paddingBottom: 15}}>
                            <Text style={styles.title}>
                                {book.title}
                            </Text >
                            <Text style={styles.body}>Author: {book.author}</Text>
                            <Text style={styles.body}>Category: {book.category}</Text>
                        </View>
                        <View style={{ alignItems: 'center'}}>
                            <Image
                                style={styles.image}
                                source={{ uri: book.coverImageUri }}
                            />
                        </View>
                        <Text style={styles.desc}>{book.longDescription}</Text>
                        <View style={{padding: 20}}>
                            <Pressable style={styles.button}
                                onPress={()=>{navigation.navigate("AddABook", {isbn : book.isbn})}}
                            >
                                <Text>Offer this book</Text>
                            </Pressable>
                        </View>
                    </>
                }
                data={offerInfo}
                renderItem={({ item }) => (
                    <ScrollView style={styles.ScrollView}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("OtherUserScreen", {
                                    user: item.offeredBy,
                                })
                            }
                        >
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: 100,
                                    width: 100,
                                    borderRadius: 100,
                                }}
                                source={{ uri: item.selectedImage }}
                            />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.body}>Offered by: </Text>
                            <Text
                                style={styles.body}
                                onPress={() =>
                                    navigation.navigate("OtherUserScreen", {
                                        user: item.offeredBy,
                                    })
                                }
                            >
                                {item.username}
                            </Text>
                        </View>
                        <Text style={styles.body}>
                            Condition: {item.condition}
                        </Text>
                        <Text style={styles.body}>Rating: {item.rating}</Text>
                        <Button
                            title="Request this book"
                            onPress={() => {
                                handleRequest(item.swapId);
                            }}
                        />
                    </ScrollView>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: "#eeeeee",
        borderRadius: 30,
    },
    body: {
        fontFamily: "Avenir",
        fontSize: 15,
        textAlign: "center",
        color: "#333333",
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
          },
    image:{
        resizeMode: "contain",
        height: 300,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        },
    button: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 22,
        margin: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#dddddd",
    },
});
