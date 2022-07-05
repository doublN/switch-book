import { View, Text, FlatList, Image, Button } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import { getSwapsByUserID, getBookByIsbn, deleteSwapById, updateSwapById } from '../Utils/dbQueries';

export default function OffersScreen() {
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
            <View>
                <Image style={{ resizeMode: "contain", height: 100, width: 100 }} source={{ uri: item.coverImageUri }}/>
                <Text>{item.title} by {item.author}</Text>
                <Text>Swap Status : {item.status === "available" ? "waiting for request" : item.status}</Text>
                {item.status === "accepted" || item.status === "requested" ? <Button title="Go to chat" /> : null}
                {item.status === "requested" ? <Button title="Deny Request" onPress={() => {handleDenyRequest(item.swapId)}} /> : <Button title="Remove offer" onPress={() => handleRemoveOffer(item.swapId)}/>}
                {item.status === "completed" ? <Button title="Rate transaction" /> : null}
            </View>
            }
        />
    )
}