import React, { useContext } from 'react'
import cam from "../images/Cam.png"
import add from "../images/Add.png"
import more from "../images/More.png"
import  Messages  from './Messages'
import Input from "./Input"
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {data} = useContext(ChatContext);
 
  return (
    <>
    <div className='chat'>
      <div className='chat_info'>
       <span>{data.user?.displayName}</span>
       <div className='chat_icon'>
        <img src={cam}></img>
        <img src={add}></img>
        <img src={more}></img>
       </div>
      </div>

      <Messages/>
      <Input/>
    </div>
    </>
  )
}

export default Chat