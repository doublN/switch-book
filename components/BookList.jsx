import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";

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

            style={styles.image}

              source={{ uri: item.coverImageUri }}
              />
            <Text style={styles.title}>
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

const styles = StyleSheet.create({
  view:{
    backgroundColor:"#aaaaaa",
    fontFamily:"Avenir",
    fontSize: 15,
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderRadius: 30,
    padding: 20,
    margin: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ffffff",
    backgroundColor: "#eeeeee",
    borderRadius: 30,
  },
  search: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 12,
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
  },
  image:{
    resizeMode: "contain",
    height: 200,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  body:{
    fontFamily:"Avenir",
    fontSize: 15,
    textAlign: "center",
    color: "#333333",
    textAlign:'justify',
      },
  title:{
    fontFamily:"Avenir",
    fontSize: 16,
    textAlign: "center",
    color: "#333333",
    padding: 10,
      }
});

export default BookList;
