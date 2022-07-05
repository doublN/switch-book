import { View, Text, StyleSheet, FlatList, Image, Pressable, Button} from 'react-native'
import React, {useContext, useLayoutEffect, useState} from 'react'
import UserContext from '../Contexts/UserContext';
import { getRequestsByUserID, getBookByIsbn, deleteSwapById, updateSwapById } from '../Utils/dbQueries'

export default function RequestsScreen() {
  const {currentUser} = useContext(UserContext);
  const [requestedBooks, setRequestedBooks]=useState([])
  const [shouldUpdate, setShouldUpdate] = useState(false)
  
  useLayoutEffect(() => {
    setShouldUpdate(false)
    async function getUserOffers(){
        const swaps= await getRequestsByUserID(currentUser.uid);
        const userBooks = await Promise.all(swaps.map((swap) => getBookByIsbn(swap.isbn)))
        const requested = []
        for(let i = 0; i < swaps.length; i++){
            requested.push({...swaps[i], ...userBooks[i]})
        }

        setRequestedBooks(requested);
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
  <FlatList style={styles.view} data={requestedBooks} renderItem={({item}) =>
      <View style={styles.list}>
          <Image style={styles.image} source={{ uri: item.coverImageUri }}/>
          <Text style={styles.body}>{item.title} by {item.author}</Text>
          <Text style={styles.body}>Swap Status : {item.status === "requested" ? "accepted" : item.status}</Text>
          {item.status === "accepted" || item.status === "requested" ? <Button title="Start chat" style={styles.button} onPress={() => navigation.navigate("Chat", {swapId: item.swapId, title: item.title, offeredBy: currentUser.username })}></Button>: null}
          {item.status === "requested" ? <Button title="Deny Request" style={styles.button} onPress={() => {handleDenyRequest(item.swapId)}} /> : <Button title="Deny request" style={styles.button} onPress={() => handleRemoveOffer(item.swapId)}/>}
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
  image:{
    resizeMode: "contain",
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
})