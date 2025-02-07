import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../Components/OAuth'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      //setLoading(true);
      const res = await fetch('/api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setError(data.message);
        // setLoading(false);
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
    }
    catch (error) {
      dispatch(signInFailure(error.message));
    }
    
  }



  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       <input type='email' placeholder='email' className='p-3 border rounded-lg' id='email' onChange={handleChange}></input>
        <input type='password' placeholder='password' className='p-3 border rounded-lg' id='password' onChange={handleChange}></input>
        <button disabled={loading} className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>No account? Create an account</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='mt-5 text-red-500'>{error}</p>}
    </div>
  );

}; 