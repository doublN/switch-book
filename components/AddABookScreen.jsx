import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function AddABookScreen() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=jane austen")
      .then((response) => {
        return response.json();
      })
      .then(({ items }) => {
        setBooks(items);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.list}>
        {books.map((book) => {
          return (
            <>
              <Image
                style={{ resizeMode: "contain", height: 200, width: 100 }}
                source={{
                  uri: `${book.volumeInfo.imageLinks.thumbnail}`,
                }}
              />
              <Text> {book.volumeInfo.title}</Text>
              <Text> {book.volumeInfo.description}</Text>
            </>
          );
        })}
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
  },
});
