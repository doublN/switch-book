import { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Image, View, Text, StyleSheet, Pressable } from "react-native"
import UserContext from "../Contexts/UserContext";
import { getMessages, addMessage } from '../Utils/dbQueries';
import { updateSwapById, getUserByUid } from '../Utils/dbQueries';

export default function ChatScreen({route, navigation}) {
  const { swapId, title, offeredBy, requestedBy, coverImage } = route.params;
  const { currentUser } = useContext(UserContext);
  const [otherPersonsUsername, setOtherPersonsUsername] = useState("")

  const [refresh, setRefresh] = useState(true)
  const [messages, setMessages] = useState([
          {
            _id: 1,
            text: 'Please stay safe when arranging to swap books. Contact us at help@switchbook.com to report any inappropriate behaviour',
            createdAt: 1657018269508,
            user: {
              _id: 2,
              name: 'Team Switch Book 📚',
              avatar: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            },
          },
        ]);


  useEffect(() => {
    let interval = setInterval(() => setRefresh(!refresh), 1000)
    return () => clearInterval(interval)
  },[refresh])

  useEffect(() => {
    fetchMessages();
  },[refresh]);

  useLayoutEffect(() => {
    fetchUsername();
  },[]);

  async function fetchUsername() {
    try{
        const otherUser = await getUserByUid(offeredBy === currentUser.uid ? requestedBy : offeredBy)
        setOtherPersonsUsername(otherUser.username);
    } catch(err) {
      console.log(err)
    }
  }

  function handleSend(messages) {
    const text = messages[0].text;
    addMessage(swapId, currentUser, text);
    fetchMessages();
  }
  
  async function fetchMessages() {
    try{
      const messageLog = await getMessages(swapId)
      const oldMessages = [...messages]
      const allMessages = [...messageLog, ...oldMessages]
      const uniqueMessages = allMessages.filter((value,idx,arr)=>arr.findIndex(value2=>(value2._id===value._id))===idx)
      setMessages(uniqueMessages);
    } catch(err) {
      console.log(err)
    }
  }

  async function handleCompleteRequest(swapId){
    await updateSwapById(swapId, requestedBy, "completed");
    navigation.navigate("Offered")
  }

  async function handleDenyRequest(swapId){
    await updateSwapById(swapId, "none", "available");
    navigation.navigate("Offered")
  }

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
        <Image style={{resizeMode:'contain', height: 60, width : 50}} source={{uri : coverImage}}/>
        <View style={{paddingTop: 15, paddingBottom: 15}}>
          <Text style={{textAlign: 'left', fontSize: 17, paddingBottom: 5 }}>{title}</Text>
          <Text style={{textAlign: 'left'}}>{offeredBy === currentUser.uid ? "Requested by" : "Offered by"} {otherPersonsUsername}</Text>
        </View>
      </View>
      { offeredBy === currentUser.uid
        ? <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <Pressable
              style={styles.button}
              onPress={() => {handleCompleteRequest(swapId)}}
            >
              <Text styles={styles.body}>Mark swap as complete</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {handleDenyRequest(swapId)}}
            >
              <Text styles={styles.body}>Cancel swap</Text>
            </Pressable>
          </View>
        : <></>
      }
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: currentUser.uid }}
        placeholder='Type your message here...'
        alwaysShowSend
        renderUsernameOnMessage
      />
    </>
  );
}

const styles =StyleSheet.create({
  body:{
    fontFamily:"Avenir",
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    color: "#333333",
      },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 22,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#dddddd",
    },
  })