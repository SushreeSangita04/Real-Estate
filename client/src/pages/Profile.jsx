import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { signOutUserFailure,signOutUserSuccess,signOutUserStart,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
export default function Profile() { 
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  const [formData, setFormData]=useState({});
  const dispatch=useDispatch();
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),

      })
      ;  
      const data=await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDeleteUser=async()=>{
    try{
       dispatch(deleteUserStart());
       const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
       });
       const data=await res.json();
       if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
       }
       dispatch(deleteUserSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut=async()=>{
    try{
      dispatch(signOutUserStart());
       const res=await fetch('/api/auth/signout');
       const data=await res.json();
       if(data.success===false){
        dispatch(signOutUserFailure(data.message));
        return;
       }
       dispatch(signOutUserSuccess(data)); 
    }
    catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }
  return(
   <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='Profile' className='self-center object-cover w-24 h-24 mt-2 rounded-full cursor-pointer'/>
        <input defaultValue={currentUser.username}  onChange={handleChange}  type='text' placeholder='username' className='p-3 border rounded-lg' id='username'/>
        <input defaultValue={currentUser.email}   onChange={handleChange} type='email' placeholder='email' className='p-3 border rounded-lg' id='email'/>
        <input type='password' placeholder='password' onChange={handleChange} className='p-3 border rounded-lg' id='password'/>
        <button disabled={loading} className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'>
          {loading?'Loading...':'Update'}
        </button>
        <Link className='p-3 text-center text-white uppercase bg-green-700 rounded-lg hover:opacity-95' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
    <div className='flex justify-between mt-5'>
      <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
      Delete Account
      </span>
      <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
      Sign Out
      </span>
      </div>
    <p className='mt-5 text-red-700'>{error?error:''}</p>
    <p className='mt-5 text-green-700'>{updateSuccess?'Successfully Updated':''}</p>
    </div>
  )
}
