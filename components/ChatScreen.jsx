import { useState, useContext, useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button, View, Text } from "react-native"
import UserContext from "../Contexts/UserContext";
import { getMessages, addMessage } from '../Utils/dbQueries';
import { updateSwapById, getUserByUid } from '../Utils/dbQueries';

export default function ChatScreen({route, navigation}) {
  const [messages, setMessages] = useState([
          {
            _id: 1,
            text: 'Please stay safe when arranging to swap books. Contact us to report any inappropriate behaviour',
            createdAt: 1657018269508,
            user: {
              _id: 2,
              name: 'Team Switch Book 📚',
              avatar: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            },
          },
        ]);
  const { swapId, title, offeredBy, requestedBy } = route.params;
  const { currentUser } = useContext(UserContext);
  const [otherPersonsUsername, setOtherPersonsUsername] = useState("")
  
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

  async function fetchUsername() {
    try{
        const otherUser = await getUserByUid(offeredBy === currentUser.uid ? requestedBy : offeredBy)
        setOtherPersonsUsername(otherUser.username);
    } catch(err) {
      console.log(err)
    }
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

  useLayoutEffect(() => {
    fetchUsername();
    fetchMessages();
  }, []);


  function handleSend(messages) {
    const text = messages[0].text;
    addMessage(swapId, currentUser, text);
    fetchMessages();
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
      <View style={{paddingTop: 15, paddingBottom: 15}}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
        <Text style={{textAlign: 'center'}}>{offeredBy === currentUser.uid ? "Requested by" : "Offered by"} {otherPersonsUsername}</Text>
      </View>
      { offeredBy === currentUser.uid
        ? <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <Button title="Mark swap as complete" onPress={() => {handleCompleteRequest(swapId)}}/>
            <Button title="Cancel swap" onPress={() => {handleDenyRequest(swapId)}}/>
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