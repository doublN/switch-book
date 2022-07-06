import { View, Text, FlatList, Image, StyleSheet, Pressable, Button } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import { getOffersByUserID, getBookByIsbn, deleteSwapById, updateSwapById } from '../Utils/dbQueries';

export default function OffersScreen({navigation}) {
    const {currentUser, shouldUpdateOffers, setShouldUpdateOffers} = useContext(UserContext);
    const [offeredBooks, setOfferedBooks] = useState([]);
    console.log(shouldUpdateOffers);

    useLayoutEffect(() => {
        setShouldUpdateOffers(false);
        async function getUserOffers(){
            const swaps = await getOffersByUserID(currentUser.uid);
            const userBooks = await Promise.all(swaps.map((swap) => getBookByIsbn(swap.isbn)))
            const offered = []
            for(let i = 0; i < swaps.length; i++){
                offered.push({...swaps[i], ...userBooks[i]})
            }
            setOfferedBooks(offered);
        }
        getUserOffers();
    }, [shouldUpdateOffers])

    async function handleRemoveOffer(swapId){
        await deleteSwapById(swapId);
        setShouldUpdateOffers(true);
    }

    async function handleDenyRequest(swapId){
        await updateSwapById(swapId, null, "available");
        setShouldUpdateOffers(true);
    }

    return (
        <FlatList style={styles.view} data={offeredBooks} renderItem={({item}) =>
            <View style={styles.list}>
                <Image style={styles.image} source={{ uri: item.coverImageUri }}/>
                <Text style={styles.body}>{item.title} by {item.author}</Text>
                <Text style={styles.body}>Swap Status : {item.status === "available" ? "waiting for request" : item.status}</Text>
                {item.status === "accepted" || item.status === "requested" ? <Button title="Go to chat" style={styles.button} onPress={() => navigation.navigate("Chat", {swapId: item.swapId, title: item.title, offeredBy: item.offeredBy, requestedBy: item.requestedBy })}></Button>: null}
                {item.status === "requested" ? <Button title="Deny Request" style={styles.button} onPress={() => {handleDenyRequest(item.swapId)}} /> : <Button title="Remove offer" style={styles.button} onPress={() => handleRemoveOffer(item.swapId)}/>}
                {item.status === "completed" ? <Button style={styles.button} title="Rate transaction" /> : null}
            </View>
            }
        />
    )
}

const styles=StyleSheet.create({
    view:{
        backgroundColor:"#aaaaaa",
        fontFamily:"Avenir",
        fontSize: 15,
      },
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderRadius: 30,
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ffffff",
        backgroundColor: "#eeeeee",
        borderRadius: 30,
      },
      body:{
        fontFamily:"Avenir",
        fontSize: 15,
        textAlign: "center",
        color: "#333333",
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
    image:{
        resizeMode: "contain",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
      },
})