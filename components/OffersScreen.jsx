import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import { getOffersByUserID, getBookByIsbn, deleteSwapById, updateSwapById } from '../Utils/dbQueries';
import { useIsFocused } from '@react-navigation/native';
import styles from "./styles"

export default function OffersScreen({navigation}) {
    const {currentUser} = useContext(UserContext);
    const [offeredBooks, setOfferedBooks] = useState([]);
    const [shouldUpdateOffers, setShouldUpdateOffers] = useState(false);
    const isFocused = useIsFocused();

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
    }, [shouldUpdateOffers, isFocused])

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
                <Text style={[styles.body, styles.interactionsBody]}><Text style={styles.bold}>{item.title}</Text> by <Text style={styles.bold}>{item.author}</Text></Text>
                <Text style={[styles.body, styles.interactionsBody]}>Swap Status : {item.status === "available" ? "waiting for request" : item.status}</Text>
                {item.status === "accepted" || item.status === "requested" ? <Pressable style={styles.button} onPress={() => navigation.navigate("Chat", {swapId: item.swapId, title: item.title, offeredBy: item.offeredBy, requestedBy: item.requestedBy, coverImage: item.coverImageUri })}><Text>Go to chat</Text></Pressable>: null}
                {item.status === "requested" ? <Pressable style={styles.button} onPress={() => {handleDenyRequest(item.swapId)}}><Text>Deny Request</Text></Pressable> : <Pressable style={styles.button} onPress={() => handleRemoveOffer(item.swapId)}><Text>Remove offer</Text></Pressable>}
                {item.status === "completed" ? <Pressable style={styles.button}><Text>Rate transaction"</Text></Pressable> : null}
            </View>
            }
        />
    )
}