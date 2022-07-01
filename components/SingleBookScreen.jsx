import { View, Text, Image, Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getSwapsByIsbn, getUserByUid } from "../Utils/dbQueries";

export default function SingleBookScreen({
  route: {
    params: { book },
  },
}) {
  const [swaps, setSwaps] = useState([]);
  const [offeredBy, setOfferedBy] = useState([]);
  const [offerInfo, setOfferInfo] = useState([]);

  useEffect(() => {
    getSwapsByIsbn(book.isbn)
      .then((swaps) => {
        setSwaps(swaps);
        const users = swaps.map((swap) => getUserByUid(swap.offeredBy));
        return Promise.all(users);
      })
      .then((users) => {
        let mergedArray = [];
        for (let i = 0; i < users.length; i++) {
          mergedArray.push({ ...users[i], ...swaps[i] });
        }
        setOfferInfo(mergedArray);
      });
  }, []);

  return (
    <View>
      <Text>
        {book.title} by {book.author}
      </Text>
      <Text>Category: {book.category}</Text>
      <Text>{book.longDescription}</Text>
      <Button title="Offer this book"></Button>
      <Image
        style={{ resizeMode: "contain", height: 200, width: 100 }}
        source={{ uri: book.coverImageUri }}
      />
      <FlatList
        data={offerInfo}
        renderItem={({ item }) => (
          <View style={{ paddingTop: 30 }}>
            <Image
              style={{ resizeMode: "contain", height: 100, width: 100 }}
              source={{ uri: item.selectedImage }}
            />
            <Text>Condition: {item.condition}</Text>
            <Text>Offered by: {item.username}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Rating: {item.rating}</Text>
            <Text>Successful swaps: {item.successfulSwaps}</Text>
            <Button title="Request this book" />
          </View>
        )}
      />
    </View>
  );
}
