import {
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles"

const BookList = ({ books, navigation }) => {
  return (
    <View style={styles.view}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Book Details", { book: item });
            }}
            >
              <View style={styles.list}>
            <Image
            style={styles.bookListImage}
            source={{ uri: item.coverImageUri }}
              />
            <Text style={styles.bookListTitle}>
              {item.title} by {item.author}
            </Text>
            <Text style={styles.body}>{item.shortDescription}</Text>
              </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default BookList;
