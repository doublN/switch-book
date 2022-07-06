import { View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native'
import React, {useContext, useLayoutEffect, useState} from 'react'
import UserContext from '../Contexts/UserContext';
import { getRequestsByUserID, getBookByIsbn, deleteSwapById, updateSwapById } from '../Utils/dbQueries'
import { useIsFocused } from '@react-navigation/native';

export default function RequestsScreen({navigation}) {
  const {currentUser} = useContext(UserContext);
  const [requestedBooks, setRequestedBooks]=useState([])
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const isFocused = useIsFocused();
  
  useLayoutEffect(() => {
    setShouldUpdate(false)
    async function getUserOffers(){
        const swaps = await getRequestsByUserID(currentUser.uid);
        const userBooks = await Promise.all(swaps.map((swap) => getBookByIsbn(swap.isbn)))
        const requested = []
        for(let i = 0; i < swaps.length; i++){
            requested.push({...swaps[i], ...userBooks[i]})
        }

        setRequestedBooks(requested);
    }
    getUserOffers();
}, [shouldUpdate, isFocused])

async function handleCancelRequest(swapId){
  await updateSwapById(swapId, " ", "available");
  setShouldUpdate(true);
}

return (
  <FlatList style={styles.view} data={requestedBooks} renderItem={({item}) =>
      <View style={styles.list}>
          <Image style={styles.image} source={{ uri: item.coverImageUri }}/>
          <Text style={styles.body}><Text style={styles.bold}>{item.title}</Text> by {item.author}</Text>
          <Text style={styles.body}>Swap Status : {item.status}</Text>
          {item.status === "accepted" || item.status === "requested" ? <Pressable style={styles.button} onPress={() => navigation.navigate("Chat", {swapId: item.swapId, title: item.title, offeredBy: item.offeredBy, requestedBy: item.requestedBy, coverImage: item.coverImageUri  })}><Text>Start chat</Text></Pressable>: null}
          {item.status === "requested" ? <Pressable style={styles.button} onPress={() => {handleCancelRequest(item.swapId)}}><Text>Cancel request</Text></Pressable> : null}
          {item.status === "completed" ? <Pressable style={styles.button}><Text>Rate transaction</Text></Pressable> : null}
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
    marginVertical: 5,
  },
  bold:{
    fontWeight : "bold",
    fontSize : 17
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 22,
    margin: 10,
    borderRadius: 4,
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