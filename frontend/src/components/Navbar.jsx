import React, { useContext } from 'react'
import {assets}  from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  let [isVisible, setVisible] = useState(false);

  let {showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    setToken('')
    setCartItems({});
  }
  
  return (
    <div className='flex items-center justify-between py-5 font-medium '>

        <img src= {assets.logo} alt="logo" className='w-36'/>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className= 'flex flex-col items-center gap-1 '>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>

            <NavLink to= '/collection' className= 'flex flex-col items-center gap-1 '>
              <p>COLLECTION</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink >

            <NavLink to= '/about' className='flex flex-col items-center  gap-1'>
              <p>ABOUT</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>

            <NavLink to= '/contact' className='flex flex-col items-center  gap-1'>
              <p>CONTACT</p>
              <hr className='w-2/4 border-none click h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} alt="search-icon"  className='w-5 cursor-pointer' onClick={() => setShowSearch(true)}/>

            <div className='group relative'> 
             
              <img onClick={()=>token ? null:navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile-icon" />
                {/* Dropdown Menu */}
                {
                  token &&  
                  <div className='group-hover:block hidden  absolute dropdown-menu right-0 pt-4'> 
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-500 rounded'>
                          <p className='cursor-pointer  hover:text-black'>My Profile</p>
                          <p onClick={()=>navigate('/orders')} className='cursor-pointer  hover:text-black'>Orders</p>
                          <p onClick={logout} className='cursor-pointer  hover:text-black'>Logout</p>
                    </div>
                  </div>
                }
             
            </div>

            <Link to='/cart' className='flex align-center justify-end relative'>
              <img src={assets.cart_icon} alt="cart-icon" className='w-5 min-w-5 cursor-pointer ' />
              <p className={`absolute text-[10px] leading-5 bg-black text-white font-semibold rounded-full text-center h-5 w-5 top-[11px] left-[9px]`}>{getCartCount()}</p>
            </Link>

            <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu-icon"  className='w-5 cursor-pointer sm:hidden'/>
        </div>

        {/* Sidebar for small screens size */}

        <div className={`absolute top-0 right-0  bottom-0 overflow-hidden bg-white transition-all ${isVisible? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col gap-5  text-gray-700'>
              <div className='flex items-center gap-3 p-3 cursor-pointer' onClick={()=> setVisible(false)}>
                <img  src={assets.dropdown_icon} alt="drop-down-icon"  className='h-4 rotate-180'/>
                 <p> Back</p>
              </div>

              <NavLink className= 'py-2 pl-6 border' onClick = {()=>setVisible(false)} to='/'>HOME</NavLink>
              <NavLink className= 'py-2 pl-6 border' onClick = {()=>setVisible(false)} to='/collection'>COLLECTION</NavLink>
              <NavLink className= 'py-2 pl-6 border' onClick = {()=>setVisible(false)} to='/about'>ABOUT</NavLink>
              <NavLink className= 'py-2 pl-6 border' onClick = {()=>setVisible(false)} to='/contact'>CONTACT</NavLink>
              

            </div>
        </div>
    </div> 
    
    
  )
}

export default Navbar