import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Pressable,
    Button
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { getUserByUid, getOffersByUserID, getBookByIsbn } from '../Utils/dbQueries'
import styles from "./styles"

export default function OtherUserScreen({route, navigation}) {
    const { user } = route.params;
    const [userInfo, setUserInfo] = useState({})
    const [userBooks, setUserBooks] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        async function getUserInfo(){
            try{
                const userDetails = await getUserByUid(user);
                const userSwaps = await getOffersByUserID(user);
                const userBooks = await Promise.all(userSwaps.map(swap => getBookByIsbn(swap.isbn)));
                setUserInfo(userDetails);
                setUserBooks(userBooks);
                setIsLoading(false);
            } catch(err) {
                setError(true);
                console.log(err)
            }
        }
        getUserInfo()
    },[error])

    if (error) {
        return (
          <View>
            <Text>Sorry, error loading this user's books, please try again!</Text>
            <Button
              onPress={() => {
                setError(false);
              }}
              title="Retry"
            ></Button>
          </View>
        );
      }
    
    if (isLoading) {
    return <Text>Loading books!</Text>;
    }
    
    return (
        <View style={styles.view}>
            <FlatList 
            ListHeaderComponent={
                <View style={styles.list}>
                    <Image source={{uri : userInfo.selectedImage}} style={styles.profileImageSmall}></Image>
                    <Text style={styles.body}>Username: {userInfo.username}</Text>
                    <Text style={styles.body}>Location: {userInfo.location}</Text>
                    <Text style={styles.body}>Rating: {userInfo.rating}</Text>
                    <Text style={styles.body}>Successful swaps: {userInfo.successfulSwaps}</Text>
                    <Text style={styles.body}>Date joined: {new Date(userInfo.dateJoined.seconds * 1000).toDateString()}</Text>
                </View>
            }
            data={userBooks}
            renderItem={({item}) =>
            <Pressable
            onPress={() => {
              navigation.navigate("SingleBookScreen", { book: item });
            }}
            >
              <View style={styles.list}>
            <Image

            style={styles.image}

              source={{ uri: item.coverImageUri }}
              />
            <Text style={styles.title}>
              {item.title} by {item.author}
            </Text>
            <Text style={styles.body}>{item.shortDescription}</Text>
              </View>
          </Pressable>
            }
            />
        </View>
    )
}