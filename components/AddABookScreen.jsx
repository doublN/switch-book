import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function AddABookScreen() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [passSearchText, setPassSearchText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${passSearchText}`)
      .then((response) => {
        return response.json();
      })
      .then(({ items }) => {
        setBooks(items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [error, passSearchText]);

  if (error) {
    return (
      <View>
        <Text>Sorry, this book is not available to add. Please try again!</Text>
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

  const handleSubmit = () => {
    setPassSearchText(searchText);
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.search}
        placeholder="Search for title or author"
        onChangeText={setSearchText}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit}></Button>
      <View style={styles.list}>
        {books
          ? books.map((book) => {
              return (
                <Pressable style={styles.logBox} key={book.id}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      height: 300,
                      width: 300,
                      borderRadius: 300 / 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    source={{
                      uri: `${book.volumeInfo.imageLinks.thumbnail}`,
                    }}
                  />
                  <Text>{book.volumeInfo.title}</Text>
                  <Text> {book.volumeInfo.description}</Text>
                </Pressable>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderRadius: 30,
  },
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#F0F0F0",
    backgroundColor: "#F9F9F9",
    borderRadius: 30,
  },
});
