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
  const [books, setBooks] = useState([
    {
      id: "3gDP8kq561wC",
      volumeInfo: {
        title: "Jane Austen's Letters",
        authors: ["Jane Austen", "Deirdre Le Faye"],

        description:
          "The fourth edition of Jane Austen's Letters incorporates the findings of new scholarship to enrich our understanding of Austen and give us the fullest view yet of her life and family. The biographical and topographical indexes have been updated, a new subject index has been created, and the contents of the notes added to the general index.",
        categories: ["Biography & Autobiography"],
        imageLinks: {
          thumbnail:
            "http://books.google.com/books/content?id=3gDP8kq561wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
      },
    },
  ]);
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
                source={{
                  uri: "http://books.google.com/books/content?id=3gDP8kq561wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
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
