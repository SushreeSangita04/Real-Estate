import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    }
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search);
        const searchTermFromUrl=urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search])
    return (
        <header className='shadow-md bg-slate-200'>
            <div className='flex items-center justify-between max-w-6xl p-3 mx-auto'>
                <Link to='/'>
                    <h1 className='flex flex-wrap text-sm font-bold sm:text-xl'>
                        <span className='text-slate-500'>Sush</span>
                        <span className='text-slate-700'>Vistas</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='flex items-center p-3 rounded-lg bg-slate-100'>
                    <input type='text' placeholder='Search...' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} className='w-24 bg-transparent sm:w-64 focus:outline-none' />
                    <button onClick={handleSubmit}><FaSearch className='text-slate-600' /></button>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline '>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>

                    {/* <Link to='/sign-in'>
<li className=' text-slate-700 hover:underline'>Sign in</li></Link> */}

                    <Link to='/profile'>
                        {currentUser ? (
                            <img src={currentUser.avatar} alt='profile' className='object-cover rounded-full w-7 h-7' />
                        ) :
                            (<li className=' text-slate-700 hover:underline'>Sign in</li>)
                        }
                    </Link>
                </ul>
            </div>
        </header >
    );

}