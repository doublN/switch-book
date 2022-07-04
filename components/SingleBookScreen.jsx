import { View, Text, Image, Button, FlatList, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { useState, useContext, useLayoutEffect } from 'react'
import { getSwapsByIsbn, getUserByUid, updateSwapById } from '../Utils/dbQueries'
import UserContext from "../Contexts/UserContext"

export default function SingleBookScreen({route, navigation}) {

  const { book } = route.params;
  const [offerInfo, setOfferInfo] = useState([])
  const [request, setRequest] = useState(false);
  const {currentUser} = useContext(UserContext);

  useLayoutEffect(() =>{
    async function mergeQueries(){
      try{
        const dbSwaps = await getSwapsByIsbn(book.isbn);
        const users = await Promise.all(dbSwaps.map(swap => getUserByUid(swap.offeredBy)));
        let mergedArray = [];
    
        for (let i=0; i < users.length; i++) {
          if(users[i].uid !== currentUser.uid){
            mergedArray.push({...users[i], ...dbSwaps[i]})
          }
        }
        setOfferInfo(mergedArray)
        setRequest(false);
      } catch(err){
        console.log(err);
      }
    }
    mergeQueries();

  }, [request])

  function handleRequest(swapId){
    updateSwapById(swapId, currentUser.uid).then(() =>{
      Alert.alert("Request sent!", "The user has been notified and will contact you soon", 
      [{text : "OK", onPress : () => console.log("ok Pressed"), style: 'cancel'}])
    }).catch((err) =>{
      console.log(err)
    })
    setRequest(true);
  }

  return (
    <View>
      <FlatList 
        ListHeaderComponent={
          <>
            <Text>{book.title} by {book.author}</Text>
            <Text>Category: {book.category}</Text>
            <Button title="Offer this book"></Button>
            <Image style={{resizeMode:'contain', height: 200, width : 100}} source={{uri : book.coverImageUri}} />
            <Text>{book.longDescription}</Text>
          </>
        }
        data={offerInfo}
        renderItem={({item}) =>
          <ScrollView style={{paddingTop: 30}}>
            <TouchableOpacity onPress={() => navigation.navigate("OtherUserScreen", { user: item.offeredBy })}>
              <Image style={{resizeMode:'contain', height: 100, width : 100, borderRadius: 100}} source={{uri : item.selectedImage}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text>Offered by: </Text>
              <Text style={{color: 'blue'}} onPress={() => navigation.navigate("OtherUserScreen", { user: item.offeredBy })}>{item.username}</Text>
            </View>
            <Text>Condition: {item.condition}</Text>
            <Text>Rating: {item.rating}</Text>
            <Button title="Request this book" onPress={() => {handleRequest(item.swapId)}}/>
          </ScrollView>
        }
       />
    </View>
  );
}
