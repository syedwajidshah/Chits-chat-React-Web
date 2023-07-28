import React, { useState } from "react";
import user1 from "../images/user1.jpg";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  doc,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { curentUser } = useContext(AuthContext);

  const handlsearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handlkey = (e) => {
    e.code === "Enter" && handlsearch();
  };

  const handlSelect = async () => {
    // check if group chats are exist if not create new one
    const combinedId =
      curentUser.uid > user.uid
        ? curentUser.uid + user.uid
        : user.uid + curentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chat
        await updateDoc(doc(db, "userChat", curentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: curentUser.uid,
            displayName: curentUser.displayName,
            photoURL: curentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null)
    setUsername("")
  };
  return (
    <div className="search">
      <div className="search_form">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handlkey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="user_chat" onClick={handlSelect}>
          <img src={user.photoURL} alt=""></img>
          <div className="user_info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
