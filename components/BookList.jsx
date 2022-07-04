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
            <Text>
              {item.title} by {item.author}
            </Text>
            <Text>{item.shortDescription}</Text>
              </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view:{
    // backgroundColor:"#423034",
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
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#423034",
    backgroundColor: "#dddddd",
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
  }
});

export default BookList;
