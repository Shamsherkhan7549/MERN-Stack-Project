import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id, images, name, price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <div className='my-10'>
        <Link className = "text-gray-700 cursor-pointer" to = {`/product/${id}`}>

            <div className='overflow-hidden'>
                <img className="hover:scale-110 transition ease-in-out " src={images} alt="Product-image" />
            </div>

            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    </div>
  )
}

export default ProductItem