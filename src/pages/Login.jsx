import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"


function Login() {

  const [err, setErr ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
 
    try{
      
     await signInWithEmailAndPassword(auth, email, password)
     navigate("/")
    
}catch(err){
      setErr(true);
    }
  };




  return (
    <>
    <div className='regester_container'>
    <div>
     </div>
     <div className='form_wrapper'> 
     <span className='logo'>chits-chat</span>
     <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          
            <input type='email' placeholder='Email'></input>
            <input type='password' placeholder='Password'></input>
           
         <button type='submit'>Sign in</button>
         {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/regester">Regester</Link></p>
     </div>
    </div>
    </>
  )
}

export default Login