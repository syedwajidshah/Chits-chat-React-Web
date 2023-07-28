import React, { useState } from "react";
import imgicon from "../images/addAvatar.png";
import "../style.scss";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth, db} from "../firebase";
import { storage } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Regester = () =>{
  const [err, setErr ] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    
    try{
   const res = await createUserWithEmailAndPassword(auth, email, password);
      
  
const storageRef = ref(storage, `${displayName}`);

await uploadBytesResumable(storageRef, file).then(() =>{
 getDownloadURL(storageRef).then(async (downloadURL) =>{
 
   try{
    await updateProfile(res.user,{
      displayName,
      photoURL: downloadURL,
    });

      await setDoc(doc(db,"users", res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db,"userChat",res.user.uid),{});
      navigate("/");


   } catch(err){
    console.log(err);
    setErr(true);
   }
     

 });
});
    
}catch(err){
      setErr(true);
    }
  };



  return (
    <>
      <div className="regester_container">
        <div></div>
        <div className="form_wrapper">
          <span className="logo">chits-chat</span>
          <span className="title">Regester</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display Name"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input style={{ display: "none" }} type="file" id="file"></input>
            <label htmlFor="file">
              <img src={imgicon} alt="abc"></img>
              <span>Add an Avatar</span>
            </label>

            <button type="submit">Sign Up</button>
            {err && <span>Something went Wrong</span>}
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
}

export default Regester;
