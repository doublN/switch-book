import { View, Text, FlatList, Image, Button, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import { getSwapsByUserID, getBookByIsbn } from '../Utils/dbQueries';

const OffersScreen =() =>{
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
            <View style={styles.list}>
                <Image style={{ resizeMode: "contain", height: 100, width: 100 }} source={{ uri: item.coverImageUri }}/>
                <Text style={styles.body}>{item.title} by {item.author}</Text>
                <Text style={styles.body}>Swap Status : {item.status}</Text>
                <Pressable style={styles.button}><Text>Go to chat</Text></Pressable>
                <Pressable style={styles.button}><Text>Remove Offer</Text></Pressable>
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

export default OffersScreen;