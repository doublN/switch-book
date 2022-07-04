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
import { getUserByUid, getSwapsByUserID, getBookByIsbn } from '../Utils/dbQueries'

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
                const userSwaps = await getSwapsByUserID(user);
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
        <View>
            <FlatList 
            ListHeaderComponent={
                <View style={styles.list}>
                    <Image source={{uri : userInfo.selectedImage}} style={styles.thumbnail}></Image>
                    <Text>Username: {userInfo.username}</Text>
                    <Text>Location: {userInfo.location}</Text>
                    <Text>Rating: {userInfo.rating}</Text>
                    <Text>Successful swaps: {userInfo.successfulSwaps}</Text>
                    <Text>Date joined: {new Date(userInfo.dateJoined.seconds * 1000).toDateString()}</Text>
                </View>
            }
            data={userBooks}
            renderItem={({item}) =>
            <Pressable style={{paddingTop: 30}} onPress={() => {
                navigation.navigate("SingleBookScreen", { book: item });
              }}>
                <Image style={{ resizeMode: "contain", height: 100, width: 100 }} source={{ uri: item.coverImageUri }}/>
                <Text>{item.title} by {item.author}</Text>
                <Text>Category: {item.category}</Text>
                <Text>{item.shortDescription}</Text>
            </Pressable>
            }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
      },
    thumbnail: {
        borderRadius: 100,
        width: 100,
        height: 100,
    },
});
