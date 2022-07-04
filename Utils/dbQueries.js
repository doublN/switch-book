import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { Alert } from "react-native";
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

const getAllUsers = async () => {
  const usersRef = collection(firestore, "users");
  const queryUser = query(usersRef);

  try {
    const querySnapshot = await getDocs(queryUser);
    let users = [];
    querySnapshot.forEach((docs) => users.push(docs.data()));
    return users;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (
  username,
  location,
  authorisedUserId,
  selectedImage
) => {
  try {
    const users = await getAllUsers();
    if (
      users.filter((user) => {
        return username === user.username;
      }).length > 0
    ) {
      throw new Error("Sorry, that username already exists");
    }

    await setDoc(
      doc(firestore, "users", authorisedUserId),
      {
        uid: authorisedUserId,
        username,
        location,
        selectedImage,
        successfulSwaps: 0,
        rating: 0,
        dateJoined: new Date(Date.now()),
      },
      { merge: true }
    );
  } catch (err) {
    Alert.alert("Error", "That username already exists!", [
      { text: "OK", style: "cancel" },
    ]);
  }
};

export const updateUser = async (
  username,
  location,
  authorisedUserId,
  selectedImage
) => {
  const userRef = doc(firestore, "users", authorisedUserId);

  let updatedInfo = {};
  username ? (updatedInfo.username = username) : null;
  location ? (updatedInfo.location = location) : null;
  selectedImage ? (updatedInfo.selectedImage = selectedImage) : null;

  updateDoc(userRef, updatedInfo);
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
          book.title.toLowerCase().includes(searchText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchText.toLowerCase()) ||
          book.category.toLowerCase().includes(searchText.toLowerCase())
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

export const getBookByIsbn = async (isbn) => {
  const booksRef = collection(firestore, "books");
  const queryBooks = query(booksRef, where("isbn", "==", isbn));
  try {
    const querySnapshot = await getDocs(queryBooks);
    let books = [];
    querySnapshot.forEach((docs) => books.push(docs.data()));
    return books[0];
  } catch (err) {
    console.log(err);
  }
};

export const updateSwapById = async (swapId, uid) => {
  const swapRef = doc(firestore, "swaps", swapId);
  updateDoc(swapRef, { status: "requested", requestedBy: uid });
};

export const getSwapsByUserID = async (uid) => {
  const swapsRef = collection(firestore, "swaps");
  const queryUser = query(swapsRef, where("offeredBy", "==", uid));

  try {
    const querySnapshot = await getDocs(queryUser);
    let books = [];
    querySnapshot.forEach((docs) => books.push(docs.data()));
    const currentUser = books;
    return currentUser;
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = async (swapId) => {
  const messagesRef = collection(firestore, "chats");
  const queryMessages = query(messagesRef, where("swapId", "==", swapId));
  try {
    const querySnapshot = await getDocs(queryMessages);
    let messages = [];
    querySnapshot.forEach((docs) => messages.push(docs.data()));
    return messages;
  } catch (err) {
    console.log(err);
  }
};

export const addMessage = async (swapId, currentUser, text) => {
  try {
    await addDoc(
      collection(firestore, "chats"),
      {
        swapId,
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
        },
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);
  }
};

//AddBook requires a field called swapId that is unique
//needs to check if isbn is in books, if not add it
//needs to add a record to swaps with swapId etc.
