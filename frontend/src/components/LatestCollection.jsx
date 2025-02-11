import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    let [latestProduct, setLatestProduct] = useState([]);

    useEffect(()=> {
      setLatestProduct(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>

      <div className='text-center py-8 text-3xl'>
        <Title text1 = "LATEST" text2 = "COLLECTIONS"/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Check out our Latest Collection for the newest trends and must-have items just in!
        </p>

      </div>

      {/* Rendering products */}

     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {
        latestProduct.map((item, index) => (
            <ProductItem key={index} id={item._id} images={item.images} name = {item.name} price = {item.price}/>
        ))
      }
     </div>
      
    </div>

   
  )
}

export default LatestCollection;