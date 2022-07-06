import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    ScrollView,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useState, useContext, useLayoutEffect } from "react";
import {
    getSwapsByIsbn,
    getUserByUid,
    updateSwapById,
} from "../Utils/dbQueries";
import UserContext from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles"


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
        <View >
            <TouchableOpacity onPress={() => navigation.goBack()}><FontAwesomeIcon icon={faArrowLeft}/></TouchableOpacity>
            <FlatList
                ListHeaderComponent={
                    <>
                    <View style={styles.list}>
                        <Text style={styles.body}>{book.title} by {book.author}</Text >
                        <Text style={styles.body}>Category: {book.category}</Text>
                        <Image
                         style={styles.image}
                         source={{ uri: book.coverImageUri }}
                         />
                        <Text style={styles.body}>{book.longDescription}</Text>
                    </View>
                    </>
                }
                data={offerInfo}
                renderItem={({ item }) => (
                    <ScrollView style={styles.ScrollView}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Other User Screen", {
                                    user: item.offeredBy,
                                })
                            }
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: item.selectedImage }}
                            />
                        </TouchableOpacity>
                        <View >
                            <Text style={styles.body}>Offered by: </Text>
                            <Text style={styles.body} onPress={() => navigation.navigate("OtherUserScreen", { user: item.offeredBy})}>
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
                        <Button title="Offer this book" onPress={()=>{navigation.navigate("AddABook", {isbn : book.isbn})}}></Button>
                    </ScrollView>
                )}
            />
        </View>
    );
}


