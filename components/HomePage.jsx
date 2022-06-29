import { Button, View, Text } from "react-native";
import BookList from "./BookList"
import { useContext } from "react";
import FirebaseContext from "../Contexts/FirebaseContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const HomePage = ({ navigation }) => {

  const {user, firestore} = useContext(FirebaseContext);
  const usersRef = collection(firestore, "users");
  
  // const users = useCollectionData(queryUser, { idField: "id" });
  
  // const UserDbQuery = async() =>{
  //   const queryUser = query(usersRef, where("uid", "==", user.uid));
  //   const querySnapshot = await getDocs(queryUser);
  //   querySnapshot.forEach((doc) => {
  //    // doc.data() is never undefined for query doc snapshots
  //    console.log(doc.id, " => ", doc.data());
  //   })

  //   return querySnapshot;
  // };

  const queryUser = query(usersRef, where("uid", "==", user.uid));
  
  // getDocs(queryUser).then((querySnapshot) =>{
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //    })
  // })

  firestore.collection('users').get().then((querySnapshot) => {
    querySnapshot.forEach(snapshot => {
        let data = snapshot.data();
        console.log(data);
    })
  })

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
      <BookList />
    </View>
  );
};

export default HomePage;
