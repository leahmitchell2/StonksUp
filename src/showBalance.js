import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  query,
  onSnapshot,
  doc,
  where,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const ShowBalance = ({ currentUser, setBalance, setBalanceID, balance }) => {
  const [balanceObj, setBalanceObj] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "Stockies"),
      where("userID", "==", currentUser.email)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let balanceFromFireBase = [];
      querySnapshot.forEach((doc) => {
        balanceFromFireBase.push({ ...doc.data(), id: doc.id });
      });
      // using the useState from above
      setBalanceObj(balanceFromFireBase);
    });

    return () => unsub();
  }, [currentUser]);

  //console.log("SHOWING THE BALANCE OBJ");
  //console.log(balanceObj[0].balance)

  try {
    setBalance(balanceObj[0].balance);
    setBalanceID(balanceObj[0].id);
    console.log("SHOWING THE BALANCE OBJ");
    console.log(balanceObj[0]);
    console.log(balanceObj[0].id);
  } catch (error) {
    // ...
  }

  return (
    <div>
      {currentUser.email}
      <br />
      balance: ${balance}
    </div>
  );
};

export default ShowBalance;
