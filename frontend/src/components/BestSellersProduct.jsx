import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSellersProduct = () => {
    const{products} = useContext(ShopContext)

    let [bestSellersProduct, setBestSellerProduct] = useState([]);

    useEffect(() => {
        setBestSellerProduct(products.filter((item) => (
            item.bestseller && item
        )))
    },[products])

  return (
    <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"BEST SELLERS"} text2={"COLLECTIONS"}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore our Bestsellers Collection to find the most popular picks loved by our customers!
                </p>

            </div>
            {/* id, image, name, price */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-16'>

                {
                    bestSellersProduct.map((item,index) => (
                        <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
                    ))
                }
            </div>

    </div>
  )


}

export default BestSellersProduct