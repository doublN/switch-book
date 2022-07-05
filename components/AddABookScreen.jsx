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

export default function AddABookScreen({ navigation }) {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
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
    const { authorisedUser, setCurrentUser, setShouldUpdateOffers } = useContext(UserContext);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${passSearchText}`)
            .then((response) => {
                return response.json();
            })
            .then(({ items }) => {
                setValue(null);
                setBooks(items);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(true);
            });
    }, [error, passSearchText]);
    if (error) {
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

    const handleAddBook_and_Sawp = () => {
        if (value === null || value === false) {
            alert("Please describe book's condition");
        }
        addBook(selectedBook, value);
        addSwap(value, selectedBook, authorisedUser.uid);
        setShouldUpdateOffers(true);
    };

    return (
        <View style={styles.list}>
            <TextInput onChangeText={setSearchText} style={styles.input} />
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
                        <Pressable style={styles.logBox}>
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: 300,
                                    width: 150,
                                }}
                                source={{
                                    uri: item.volumeInfo.imageLinks.thumbnail,
                                }}
                            />
                            <Text>
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
                onPress={handleAddBook_and_Sawp}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 20,
        margin: 10,
        borderRadius: 50,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
    },
    logBox: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        padding: 10,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#f0f0f0",
        backgroundColor: "#f9f9f9",
    },
});
