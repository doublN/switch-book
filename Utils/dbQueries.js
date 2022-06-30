import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
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

export const createUser = async (username, location, authorisedUser) => {
  try {
    await setDoc(doc(firestore, "users", authorisedUser), {
      // insert data for database here (needs to include 'uid: authorisedUser.uid')
      uid: authorisedUser,
      username,
      location,
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
  const querySwap = query(swapsRef, where("isbn", "==", isbn));

  try {
    const querySnapshot = await getDocs(querySwap);
    let swaps = [];
    querySnapshot.forEach((docs) => swaps.push(docs.data()));
    return swaps;
  } catch (err) {
    console.log(err);
  }
};
