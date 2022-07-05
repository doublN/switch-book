import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import BookList from "./BookList";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import { getBooks } from "../Utils/dbQueries";
import { Feather, Entypo } from "@expo/vector-icons";

const HomePageScreen = ({navigation, clicked, setCLicked}) => {
  const { currentUser } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchSubmit, setSearchSubmit] = useState(false);

  useEffect(() => {
    setSearchSubmit(false);
    getBooks(search)
      .then((books) => {
        setBooks(books);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log("err");
      });
  }, [error, searchSubmit]);

  if (error) {
    return (
      <View style={styles.view}>
        <Text>Sorry, error loading books, please try again!</Text>
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
    <View >
            <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >

      <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
          />

      <TextInput
        style={styles.searchBar}
        placeholder="Search for title, author, or category"
        onChangeText={setSearch}
        onFocus={() => {
          setSearchSubmit(true);
        }}
        />

      </View>
      {clicked && (
        <View>
      <Button
        title="Submit"
        onPress={() => {
          setSearchSubmit(false);
        }}
        ></Button>
        </View>
      )}
      <BookList books={books} navigation={navigation} style={styles.booklist}/>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 15,
    marginLeft: 10,
    width: "90%",
    fontFamily:"Avenir",
    textAlign: "center",
    height: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default HomePageScreen;
