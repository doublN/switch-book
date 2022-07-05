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
              navigation.navigate("SingleBookScreen", { book: item });
            }}
            >
              <View style={styles.list}>
            <Image
              style={{ resizeMode: "contain", height: 200, width: 100}}
              source={{ uri: item.coverImageUri }}
              />
            <Text style={styles.body}>
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
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  body:{
    fontFamily:"Avenir",
    fontSize: 15,
    textAlign: "center",
    color: "#333333",
      }
});

export default BookList;
