import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import { getSwapsByUserID, getBookByIsbn, deleteSwapById, updateSwapById } from '../Utils/dbQueries';

export default function OffersScreen({navigation}) {
    const {currentUser} = useContext(UserContext);
    const [offeredBooks, setOfferedBooks] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    useLayoutEffect(() => {
        setShouldUpdate(false);
        async function getUserOffers(){
            const swaps = await getSwapsByUserID(currentUser.uid);
            const userBooks = await Promise.all(swaps.map((swap) => getBookByIsbn(swap.isbn)))
            const offered = []
            for(let i = 0; i < swaps.length; i++){
                offered.push({...swaps[i], ...userBooks[i]})
            }
            setOfferedBooks(offered);
        }
        getUserOffers();
    }, [shouldUpdate])

    async function handleRemoveOffer(swapId){
        await deleteSwapById(swapId);
        setShouldUpdate(true);
    }

    async function handleDenyRequest(swapId){
        await updateSwapById(swapId, null, "available");
        setShouldUpdate(true);
    }

    return (
        <FlatList data={offeredBooks} renderItem={({item}) =>
            <View style={styles.list}>
                <Image style={{ resizeMode: "contain", height: 100, width: 100 }} source={{ uri: item.coverImageUri }}/>
                <Text style={styles.body}>{item.title} by {item.author}</Text>
                <Text style={styles.body}>Swap Status : {item.status === "available" ? "waiting for request" : item.status}</Text>
                {item.status === "accepted" || item.status === "requested" ? <Button title="Start chat" style={styles.button} onPress={() => navigation.navigate("Chat", {swapId: item.swapId, title: item.title, offeredBy: currentUser.username })}></Button>: null}
                {item.status === "requested" ? <Button title="Deny Request" style={styles.button} onPress={() => {handleDenyRequest(item.swapId)}} /> : <Button title="Remove offer" style={styles.button} onPress={() => handleRemoveOffer(item.swapId)}/>}
                {item.status === "completed" ? <Button style={styles.button} title="Rate transaction" /> : null}
            </View>
            }
        />
    )
}

const styles=StyleSheet.create({
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