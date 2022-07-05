import { useState, useContext, useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button, View, Text } from "react-native"
import UserContext from "../Contexts/UserContext";
import { getMessages, addMessage } from '../Utils/dbQueries';

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
  const { swapId, title, offeredBy } = route.params;
  const { currentUser } = useContext(UserContext);
  
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

  function handleSend(messages) {
      const text = messages[0].text;
      addMessage(swapId, currentUser, text);
      fetchMessages();
  }

  useLayoutEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <View style={{paddingTop: 15, paddingBottom: 15}}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
        <Text style={{textAlign: 'center'}}>Offered by {offeredBy}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <Button title="Mark swap as complete"/>
        <Button title="Cancel swap"/>
      </View>
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