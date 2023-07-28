import React, { useContext, useEffect, useRef } from 'react'
import user1 from "../images/user1.jpg"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';


const Message = ({message}) => {
  const {curentUser} = useContext(AuthContext);
  const { data} = useContext(ChatContext);
  const ref = useRef()
   useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
   },[message])
    
  return (
    <div ref={ref}
    className={`message ${message.senderId === curentUser.uid && "owner"}`}>
    
      <div   
      className='message_info'>
      <img src={message.senderId === curentUser.uid ? curentUser.photoURL: data.user.photoURL} alt=''></img>
      <span>just now</span>
      </div>
      <div className='message_content'>
        <p>{message.text}</p>
       {message.img && <img src={message.img} alt=''/>}
      </div>
       
    </div>
  )
}

export default Message