import React from 'react'
import user1 from "../images/user1.jpg"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
const {curentUser}  = useContext(AuthContext);

  return (
    <div className='navbar'>
        <span className='logo'>chits-chat</span>
         <div className='user'>
            <img src={curentUser.photoURL} alt=''></img>
            <span>{curentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
         </div>
    </div>
  )
}

export default Navbar