import React, { useEffect } from 'react'
import { useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({token}) => {
  const[list, setList] = useState([]);

  const fetchList = async() => {
      try{
        const response = await axios.get(backendUrl+'/product/list');
        if(response.data.success){
          return setList(response.data.products);
        }
        else{
          toast.error(response.data.message)
        }
        
      }catch(err){
        console.log(err);
        toast.error(err.message)

      }
  };

  const removeProduct = async(id) => {
      try{
        const response = await axios.post(backendUrl+'/product/remove',{id}, {headers:{token}});
        if(response.data.success){
        toast.success(response.data.message)
        await fetchList();

        }else{
          toast.error(response.data.message)
        }
      } catch(error) {
        console.log(error);
        toast.error(error.message)
      }  
  };

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm'>
       {/*-----------List Table Title------------*/}
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
        </div>
        {/* ---------Product Details---------- */}
        
          {list.map((item, index)=>(
            <div key={index}  className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 text-sm'>
              <img className='w-12 h-12' src={item.images[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>              
            </div>
          ))
          } 
    </>
  )
}

export default List