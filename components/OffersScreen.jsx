import { View, Text, FlatList, Image, Button } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import { getSwapsByUserID, getBookByIsbn } from '../Utils/dbQueries';

export default function OffersScreen() {
    const {currentUser} = useContext(UserContext);
    const [offeredBooks, setOfferedBooks] = useState([]);

    useLayoutEffect(() => {
        async function getUserOffers(){
            const swaps= await getSwapsByUserID(currentUser.uid);
            const userBooks = await Promise.all(swaps.map((swap) => getBookByIsbn(swap.isbn)))
            const offered = []
            for(let i = 0; i < swaps.length; i++){
                offered.push({...swaps[i], ...userBooks[i]})
            }

            setOfferedBooks(offered);
        }
        getUserOffers();
    }, [])

    return (
        <FlatList data={offeredBooks} renderItem={({item}) =>
            <View>
                <Image style={{ resizeMode: "contain", height: 100, width: 100 }} source={{ uri: item.coverImageUri }}/>
                <Text>{item.title} by {item.author}</Text>
                <Text>Swap Status : {item.status}</Text>
                <Button title="Go to chat" />
                <Button title="Remove offer" />
            </View>
            }
            />
    )
}