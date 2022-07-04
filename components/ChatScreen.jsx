// export function Example() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ])
//   }, [])

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   }, [])

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   )
// }


import { useState, useContext, useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import UserContext from "../Contexts/UserContext";
import { getMessages, addMessage } from '../Utils/dbQueries';

export default function ChatScreen({route, navigation}) {
  const [messages, setMessages] = useState([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]);
  const { swapId } = route.params;
  const { currentUser } = useContext(UserContext);

  function handleSend(messages) {
      const text = messages[0].text;
      addMessage(swapId, currentUser, text);
  }

  useLayoutEffect(() => {
    async function fetchMessages() {
      try{
        const messageLog = await getMessages(swapId)
        setMessages(messageLog);
      } catch(err) {
        console.log(err)
      }
    }

    fetchMessages();
    console.log(messages)

  }, []);


  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      placeholder='Type your message here...'
    />
  );
}