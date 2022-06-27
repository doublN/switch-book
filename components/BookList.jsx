import { Text, View, FlatList, ScrollView, Image } from "react-native";
import React, { useState } from "react";

const BookList = () => {


  const [books, setBooks] = useState([
    {
      title: "Surely you're joking, Mr Feynman",
      author: "Dr R Feynman",
      description: "Adventures of a Curious Character",
      username: "Malavika Mysore",
      dateAdded: "01/01/2022",
      genre: "non-fiction",
      imageURI : "https://images-na.ssl-images-amazon.com/images/I/71yPWidjDaL.jpg",
    },
  ]);

  const image = (props) => (
    <Image source={{uri : props.imageURI}}/>
  )

  return (
    <View>
      <FlatList 
        data={books}
        renderItem={({item}) => <ScrollView>
          <Image style={{height: 200, width : 200}} source={{uri : item.imageURI}} />
          <Text>{item.title} by {item.author}</Text>
          <Text>{item.genre}</Text>
          <Text>{item.description}</Text>
          <Text>Owner: {item.username}</Text>
          <Text>Added on {item.dateAdded}</Text>
        </ScrollView>} />
    </View>
  );
};

export default BookList;
