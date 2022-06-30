
import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import BookList from "./BookList"
import { useContext, useState, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import {getBooks} from "../Utils/dbQueries"

const HomePageScreen = ({ navigation }) => {

  const {currentUser} = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchSubmit, setSearchSubmit] = useState(false)
  
  useEffect(() =>{
    setSearchSubmit(false);
    getBooks(search).then((books) =>{
      setBooks(books);
      setIsLoading(false);
    }).catch((err) =>{
      setError(true);
      console.log("err");
    })
  }, [error, searchSubmit])

  if(error){
    return <View>
        <Text>Sorry, error loading books, please try again!</Text>
        <Button onPress={() => {setError(false)}} title="Retry"></Button>
    </View>
  }

  if(isLoading){
    return <Text>Loading books!</Text>
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Available books</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for title, author, or category"
        onChangeText={setSearch}
      ></TextInput>
      <Button title="Submit" onPress={() => {setSearchSubmit(true)}}></Button>
      <BookList books={books} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
      }
})

export default HomePageScreen;
