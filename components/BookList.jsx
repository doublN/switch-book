import { Text, View, FlatList, ScrollView, Image, Button, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

const BookList = ({books, navigation}) => {

  return (
    <View style={styles.list}>
      <FlatList 
        data={books}
        renderItem={({item}) =>
        <Pressable onPress={() => {navigation.navigate("SingleBookScreen", {book : item});}} style={styles.list}>
          <Image style={{resizeMode:'contain', height: 200, width : 100}} source={{uri : item.coverImageUri}} />
          <Text>{item.title} by {item.author}</Text>
          <Text>{item.shortDescription}</Text>
        </Pressable>} />
    </View>
  );
};

const styles = StyleSheet.create({
  list : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  }
})

export default BookList;
