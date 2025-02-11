import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext)
  const [productData, setProductData] = useState({});
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  
  const fetchProductData = () => {
      const product = products.find(item => item._id === productId)
      if(product){
        setProductData(product);    
        setImage(product.images[0])
      }
    }
  
   

  useEffect(() => {
    fetchProductData()
    },[productId, products])

  return  (
    <div className='border-t-2 p-10 transiton-opacity ease-in duration-5 opacity-100'>
        {/* product data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          {/* product images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
             productData.images && productData.images.map((item,index) => (
               <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-[98%] sm:full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
            </div>

            <div className='w-full sm:w-[80%]'>
              <img src={image} className='w-full h-auto'/>
            </div>

          </div>

          {/* product information */}
          <div className='flex-1 pr-4'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_icon} alt="" className="w-3.5" />
                  <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                  <p className='pl-2 text-gray-400'>(122)</p>
            </div>
              
            <p className='font-semibold text-xl pt-4'>
             {currency}{productData.price}
            </p>
            
            <p className='pt-4 text-gray-500'>{productData.description}</p>

            <div className='flex gap-3 flex-col pt-4 '>
              <p className='text-sm'>Select size</p>

              <div className='flex gap-2 text-black text-sm'>
              {
               productData.sizes &&  productData.sizes.map((item, index) => (
                      <div onClick={()=> setSize(item)} key ={index} className={`border border-gray bg-gray-100 px-3 py-2 cursor-pointer ${item===size ? "border-orange-500" : "border-gray"}`}>
                        {item}
                      </div>
                  ))
              }
                
              </div>                 
            </div>
            <button onClick={()=>addToCart(productData._id,size,0)} className='bg-black text-white mt-8 px-8 py-2 text-sm'>ADD TO CART</button> 

            <hr className='border-1.5 border-gray mt-8' />

            <p className='text-gray-500 w-[50%] text-xs pt-8 leading-7'>
              100% Original product. <br/>

              Cash on delivery is available on this product.

              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
     {/* Description and reviews */}

     <div className='mt-20 text-sm'>
        <div className='flex'>
          <p className='border border-gray px-4 py-2 font-semibold'>Description</p>
          <p className='border border-gray px-4 py-2'>Reviews</p>
        </div>

        <div className='text-sm text-gray-500 flex flex-col gap-4 border border-gray py-6 px-6'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
     </div>
      
      <div>
              
        {
         productData.category && productData.subCategory && <RelatedProduct category={productData.category[0]} subCategory={productData.subCategory[0]} />
        }
      </div>
    </div>
  )
}

export default Product