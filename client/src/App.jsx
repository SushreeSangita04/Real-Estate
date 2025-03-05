import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/create-listing' element={<CreateListing/>} />
          <Route path='/update-listing/:ListingId' element={<UpdateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
