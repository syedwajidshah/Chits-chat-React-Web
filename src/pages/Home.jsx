import React from 'react'
import Slidebar from "../components/Sidebar"
import Chat from "../components/Chat"
function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
       <Slidebar/>
       <Chat/>
      </div>
    </div>
  )
}

export default Home