import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import SearchBox from './components/SearchBox'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]'>
      <Navbar/>
      <hr className='h-[1px] bg-gray' />
      <SearchBox/>
      <ToastContainer/>
      <Routes>

        <Route path='/' element = {<Home/>}/>
        <Route path='/collection' element= {<Collection/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        <Route path='/product/:productId' element = {<Product/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/placeorder' element = {<Placeorder/>}/>
        <Route path='/orders' element = {<Order/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App