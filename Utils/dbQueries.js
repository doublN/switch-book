import { async } from "@firebase/util";
import {
    query,
    where,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    doc,
    orderBy,
    collection,
} from "firebase/firestore";
import { firestore } from "./firebase";

export const getUserByUid = async (uid) => {
    const usersRef = collection(firestore, "users");
    const queryUser = query(usersRef, where("uid", "==", uid));

    try {
        const querySnapshot = await getDocs(queryUser);
        let users = [];
        querySnapshot.forEach((docs) => users.push(docs.data()));
        const currentUser = users[0];
        return currentUser;
    } catch (err) {
        console.log(err);
    }
};

export const createUser = async (
    username,
    location,
    authorisedUser,
    selectedImage
) => {
    try {
        await setDoc(doc(firestore, "users", authorisedUser), {
            uid: authorisedUser,
            username,
            location,
            selectedImage,
            successfulSwaps: 0,
            rating: 0,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addBook = async ({ volumeInfo, id }) => {
    try {
        await setDoc(doc(firestore, "books", id), {
            title: volumeInfo.title,
            author: volumeInfo.authors[0],
            category: volumeInfo.categories[0],
            description: volumeInfo.description,
            ISBN_13: volumeInfo.industryIdentifiers[1].identifier,
            ISBN_10: volumeInfo.industryIdentifiers[0].identifier,
            thumbnail: volumeInfo.imageLinks.thumbnail,
            date_published: volumeInfo.publishedDate,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addSwap = async (condition, { volumeInfo }, authorisedUserId) => {
    try {
        await setDoc(doc(collection(firestore, "swaps")), {
            condition,
            ISBN_13: volumeInfo.industryIdentifiers[1].identifier,
            ISBN_10: volumeInfo.industryIdentifiers[0].identifier,
            offeredBy: authorisedUserId,
            status: "available",
        });
    } catch (err) {
        console.log(err);
    }
};

export const getBooks = async (searchText) => {
    const booksRef = collection(firestore, "books");
    const queryBooks = query(booksRef, orderBy("dateAdded", "desc"));

    try {
        const querySnapshot = await getDocs(queryBooks);
        let books = [];
        querySnapshot.forEach((docs) => books.push(docs.data()));

        if (searchText) {
            const filteredBooks = books.filter((book) => {
                return (
                    book.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    book.author
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    book.category
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            });
            return filteredBooks;
        }

        return books;
    } catch (err) {
        console.log(err);
    }
};

export const getSwapsByIsbn = async (isbn) => {
    const swapsRef = collection(firestore, "swaps");
    const querySwap = query(
        swapsRef,
        where("isbn", "==", isbn),
        where("status", "==", "available")
    );
    try {
        const querySnapshot = await getDocs(querySwap);
        let swaps = [];
        querySnapshot.forEach((docs) => swaps.push(docs.data()));
        return swaps;
    } catch (err) {
        console.log(err);
    }
};

export const updateSwapById = async (swapId, uid) => {
    const swapRef = doc(firestore, "swaps", swapId);
    updateDoc(swapRef, { status: "requested", requestedBy: uid });
};

//AddBook requires a field called swapId that is unique
//needs to check if isbn is in books, if not add it
//needs to add a record to swaps with swapId etc.
