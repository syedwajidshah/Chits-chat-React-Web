import React, { useContext, useState } from 'react'
import Img from "../images/img.png"
import Attach from "../images/attach.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, updateDoc } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import { storage } from '../firebase'
import { getDownloadURL, uploadBytesResumable,ref } from 'firebase/storage'
import { db } from '../firebase'
import { arrayUnion } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'


const Input = () => {
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

const {curentUser} = useContext(AuthContext);
const {data} = useContext(ChatContext);

 const handleSend = async() =>{
   if(img){
        const storageRef = ref(storage,uuid());
        const uploadTask = uploadBytesResumable(storageRef,img);
        uploadTask.on(
          (error)=>{

          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) =>{
              await updateDoc(doc(db,"chats",data.chatId),{
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: curentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );


   }else{
     await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
          id: uuid(),
          text,
          senderId : curentUser.uid,
          date: Timestamp.now(),
        }),
      
     });
   }
      await updateDoc(doc(db,"userChat", curentUser.uid),{
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db,"userChat", data.user.uid),{
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      

   setText("")
   setImg(null)
 }


  return (
    <div className='input'>
      <input type='text' placeholder='Type something...' onChange={(e)=>setText(e.target.value)}
        value={text}
      ></input>
      <div className='send'>
        <img src={Attach} alt=''></img>
        <input type='file' style={{display:"none"}} id='file' onChange={(e)=>setImg(e.target.files[0])}></input>
        <label htmlFor='file'>
          <img src={Img} alt=''></img>
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default Input