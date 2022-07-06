import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    FlatList,
    Pressable,
    Button,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { addBook, addSwap } from "../Utils/dbQueries";
import UserContext from "../Contexts/UserContext";

export default function AddABookScreen({ navigation, route }) {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState(route.params ? route.params.isbn : "");
    const [passSearchText, setPassSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [condition, setCondition] = useState([
        { label: "Like new", value: "Like-new" },
        { label: "Satisfactory", value: "Satisfactory" },
        { label: "Boxed edges", value: "Boxed-edges" },
    ]);
    const [selectedBook, setSelectedBook] = useState([]);
    const { authorisedUser} = useContext(UserContext);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${passSearchText}`)
            .then((response) => {
                return response.json();
            })
            .then(({ items }) => {
                setIsLoading(false);
                return items.filter((item) => {
                    return (
                        item.volumeInfo.categories !== undefined &&
                        item.volumeInfo.industryIdentifiers !== undefined &&
                        item.volumeInfo.imageLinks.thumbnail !== undefined
                    );
                });
            })
            .then((filterItems) => {
                setValue(null);
                setBooks(filterItems);
            })
            .catch((error) => {});
    }, [error, passSearchText]);
    if (error) {
        console.log(error);
        return (
            <View>
                <Text>
                    Sorry, this book is not available to add. Please try again!
                </Text>
                <Button
                    onPress={() => {
                        setError(false);
                    }}
                    title="Retry"
                ></Button>
            </View>
        );
    }
    if (isLoading) {
        return <Text>Loading books!</Text>;
    }

    const handleSubmit = () => {
        setPassSearchText(searchText);
    };

    const handleAddBook_and_Swap = () => {
        if (value === null || value === false) {
            alert("Please describe book's condition");
        } else {
            addBook(selectedBook, value);
            addSwap(value, selectedBook, authorisedUser.uid);
            navigation.navigate("Switch Book", {
                screen: "Interactions",
                params: { screen: "Offer this book" },
            });
        }
     };

    return (
        <View style={styles.list}>
            <TextInput value={searchText} onChangeText={setSearchText} style={styles.searchBar} placeholder="Search by title, author or ISBN" />
            <Button
                style={styles.borderRadius}
                title="Search..."
                onPress={handleSubmit}
            />
            {books ? (
                <FlatList
                    style={{ height: 100 }}
                    data={books}
                    renderItem={({ item }) => (
                        <Pressable style={styles.list}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: item.volumeInfo.imageLinks.thumbnail,
                                }}
                            />
                            <Text style={styles.body}>
                                {item.volumeInfo.title} by{" "}
                                {item.volumeInfo.authors}
                            </Text>
                            <Text numberOfLines={2}>
                                {item.volumeInfo.description}
                            </Text>
                            <RadioButton
                                onPress={() => {
                                    setChecked(item.id);
                                    setValue(null);
                                    setSelectedBook(item);
                                }}
                                value={item.id}
                                status={
                                    checked === item.id
                                        ? "checked"
                                        : "unchecked"
                                }
                            />
                        </Pressable>
                    )}
                />
            ) : null}
            <DropDownPicker
                placeholder="Select the condition of the book"
                open={open}
                value={value}
                items={condition}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setCondition}
            />
            <Button
                title="Add book"
                style={styles.borderRadius}
                onPress={handleAddBook_and_Swap}
            />
        </View>
    );
}

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
          margin: 10,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: "#ffffff",
          backgroundColor: "",
          borderRadius: 30,
        },
        searchBar: {
            fontSize: 15,
            marginLeft: 10,
            width: "90%",
            fontFamily:"Avenir",
            textAlign: "center",
            height: 30,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 30
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
            },
});
