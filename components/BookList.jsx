import { Text, View } from "react-native";
import React, { useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([
    {
      title: "Surely you're joking, Mr Feynman",
      author: "Dr R Feynman",
      description: " Adventures of a Curious Character",
      username: "Malavika Mysore",
      dateAdded: "2022",
      genre: "non-fiction",
    },
  ]);
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default BookList;
