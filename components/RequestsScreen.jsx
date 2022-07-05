import { View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native'
import React, {useContext, useLayoutEffect, useState} from 'react'
import UserContext from '../Contexts/UserContext';
import { getSwapsByUserID, getBookByIsbn } from '../Utils/dbQueries'


export default function RequestsScreen() {
  const {currentUser} = useContext(UserContext);
  const [requestedBooks, setRequestedBooks]=useState([])

  useLayoutEffect(() => {
    async function getUserOffers(){
        const swaps= await getSwapsByUserID(currentUser.uid);
        const userBooks = await Promise.all(swaps.map((swap) => getBookByIsbn(swap.isbn)))
        const requested = []
        for(let i = 0; i < swaps.length; i++){
            requested.push({...swaps[i], ...userBooks[i]})
        }

        setRequestedBooks(requested);
    }
    getUserOffers();
}, [])

  return (
    <FlatList data={requestedBooks} renderItem={({item}) =>
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