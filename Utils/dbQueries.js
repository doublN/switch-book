import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  orderBy,
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
  authorisedUserId,
  selectedImage
) => {
  try {
    await setDoc(
      doc(firestore, "users", authorisedUserId),
      {
        uid: authorisedUserId,
        username,
        location,
        selectedImage,
        successfulSwaps: 0,
        rating: 0,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);
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

export const getBooksByIsbn = async (isbn) => {
  const booksRef = collection(firestore, "books");
  const queryBooks = query(booksRef, where("isbn", "==", isbn));
  try {
    const querySnapshot = await getDocs(queryBooks);
    let books = [];
    querySnapshot.forEach((docs) => books.push(docs.data()));
    return books;
  } catch (err) {
    console.log(err);
  }
};

export const updateSwapById = async (swapId, uid) => {
  const swapRef = doc(firestore, "swaps", swapId);
  updateDoc(swapRef, { status: "requested", requestedBy: uid });
};

export const getIsbnsByUserID = async (uid) => {
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

//AddBook requires a field called swapId that is unique
//needs to check if isbn is in books, if not add it
//needs to add a record to swaps with swapId etc.
