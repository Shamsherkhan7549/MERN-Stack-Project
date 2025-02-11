import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';


const SearchBox = () => {

    let {showSearch, setShowSearch, search, setSearch} = useContext(ShopContext);
    let [visible, setVisible] = useState(false)

    let location = useLocation()
    
    useEffect(() => {
        if(location.pathname.includes('/collection')){
            setVisible(true)
        }else{
            setVisible(false)
        }

    }, [location])

  return (
    <div className={`flex justify-center items-center gap-2  h-16 border-t border-b border-gray-medium bg-gray-50 ${showSearch && visible ? 'block' : 'hidden'}`}>
        <input type="text"  placeholder='Search Product' value={search} onChange={(evt) => setSearch(evt.target.value)} className='w-2/4 h-2/4 bg-inherit text-sm  border border-gray-400 py-4 px-5 rounded-full outline-none'/>
        <img src={assets.cross_icon} alt="crosicon" className='w-3.5 cursor-pointer' onClick={() => setShowSearch(false)}/>
    </div>
  )
}

export default SearchBox