import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';

export default function OAuth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try{
           const provider=new GoogleAuthProvider();
           const auth=getAuth(app);
           const result=await signInWithPopup(auth,provider);
           const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
           body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.avatar}),
           });
          const data=await res.json();
          dispatch(signInSuccess(data));
          navigate('/');
          }
        catch(error){
            console.log("Couldn't signin",error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95'>
      Continue with Google
    </button>
  )
}
