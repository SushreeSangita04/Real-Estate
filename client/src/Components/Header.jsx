import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
export default function Header() {
    return (
        <header className='shadow-md bg-slate-200'>
            <div className='flex items-center justify-between max-w-6xl p-3 mx-auto'>
                <Link to='/'>
                <h1 className='flex flex-wrap text-sm font-bold sm:text-xl'>
                    <span className='text-slate-500'>Sush</span>
                    <span className='text-slate-700'>Vistas</span>
                </h1></Link>
                <form className='flex items-center p-3 rounded-lg bg-slate-100'>
                    <input type='text' placeholder='Search...'  className='w-24 bg-transparent sm:w-64 focus:outline-none'/>
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline '>Home</li></Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link> 
                <Link to='/sign-in'>
                <li className=' text-slate-700 hover:underline'>Sign in</li></Link>
                </ul>
            </div>
        </header>
    );
}
