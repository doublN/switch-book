import {
    View, Text,
    Image,
    Button,
    FlatList,
    ScrollView,
    Alert,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useState, useContext, useLayoutEffect } from "react";
import {
    getSwapsByIsbn,
    getUserByUid,
    updateSwapById,
} from "../Utils/dbQueries";
import UserContext from "../Contexts/UserContext";


export default function SingleBookScreen({route, navigation}) {
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
                        <Text style={styles.body}>
                            {book.title} by {book.author}
                        </Text >
                        <Text style={styles.body}>Category: {book.category}</Text>
                        <Button title="Offer this book" onPress={()=>{navigation.navigate("AddABook", {isbn : book.isbn})}}></Button>
                        <Image
                            style={styles.image}
                            source={{ uri: book.coverImageUri }}
                        />
                        <Text style={styles.body}>{book.longDescription}</Text>
                    </>
                }
                data={offerInfo}
                renderItem={({ item }) => (
                    <ScrollView style={styles.ScrollView}>
                        <TouchableOpacity onPress={() => navigation.navigate("OtherUserScreen", { user: item.offeredBy })}>
                            <Image style={{resizeMode:'contain', height: 100, width : 100, borderRadius: 100}} source={{uri : item.selectedImage}}/>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.body}>Offered by: </Text>
                            <Text style={styles.body} onPress={() => navigation.navigate("OtherUserScreen", { user: item.offeredBy })}>{item.username}</Text>
                        </View>
                        <Text style={styles.body}>Condition: {item.condition}</Text>
                        <Text style={styles.body}>Rating: {item.rating}</Text>
                        <Button title="Request this book" onPress={() => {handleRequest(item.swapId)}}/>
                    </ScrollView>
                )}
            />
        </View>
    );
}

const styles=StyleSheet.create({
    ScrollView:{padding: 30},
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
    body:{
         fontFamily:"Avenir",
         fontSize: 15,
         textAlign: "center",
         color: "#333333",
          },
    image:{
         resizeMode: "contain",
         height: 300,
         width: 300,
         justifyContent: "center",
         alignItems: "center",
          },
    button: {
         flexDirection: "row",
         alignItems: 'center',
         paddingVertical: 12,
         paddingHorizontal: 22,
         margin: 10,
         borderRadius: 30,
         elevation: 3,
         backgroundColor: "#dddddd",
    },
})
