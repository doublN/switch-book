import { Text, View, FlatList, ScrollView, Image, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

const BookList = ({books}) => {
  return (
      <FlatList 
        data={books}
        renderItem={({item}) => <ScrollView>
          <Image style={{resizeMode:'contain', height: 200, width : 100}} source={{uri : item.coverImageUri}} />
          <Text>{item.title} by {item.author}</Text>
          <Text>{item.shortDescription}</Text>
        </ScrollView>} />
  );
};

export default BookList;
