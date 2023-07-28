import React, { useContext, useEffect, useState } from 'react'
import user1 from "../images/user1.jpg"
import { AuthContext } from '../context/AuthContext'
import { doc } from 'firebase/firestore'
import {onSnapshot } from "firebase/firestore";
import { db } from '../firebase'
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([])
  const {curentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)

  useEffect(() =>{
    const getChats = () =>{
    const unsub = onSnapshot(doc(db, "userChat", curentUser.uid), (doc) => {
      setChats(doc.data());
  });
     return()=>{
      unsub();
     };
    };
    curentUser.uid && getChats();
  },[curentUser.uid]);

  
  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER",payload:u });
  };


  return (
    <div className='chats'>
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
      <div className='user_chat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
      <img src={chat[1].userInfo.photoURL}></img>
      <div className='user_info'>
      <span>{chat[1].userInfo.displayName}</span>
      <p>{chat[1].lastMessage?.text}</p>
      </div>
      </div>

    ))}
      
    </div>
  )
}

export default Chats