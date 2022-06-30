import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "./firebase";

export const getCurrentUser = async (authorisedUser) => {
  const usersRef = collection(firestore, "users");
  const queryUser = query(usersRef, where("uid", "==", authorisedUser));

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
