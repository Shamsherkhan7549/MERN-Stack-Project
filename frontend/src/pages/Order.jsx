/** @format */

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Order = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [allOrders, setAllOrders] = useState([]);

  const getOrders = async () => {
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + "/order/userorders",{}, {
        headers: { token },

      });

      if(response.data.success){
        let orders = []
         response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            orders.push(item)
          })
        })

        setAllOrders(orders.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
    allOrders
  }, [token]);

  return (
    <div className='my-5'>
      <div className='text-2xl py-5'>
        <Title text1={"MY"} text2={"ORDERS"} />
        <hr className='h-[1px] bg-gray-300 mt-2' />
      </div>

      <div>
        {allOrders.map((product, index) => (
          <div
            className='flex sm:gap-2 sm:items-center  border-b border-gray-300 sm:justify-between flex-col sm:flex-row py-10 sm:py-0 gap-5 items-start'
            key={index}>
            <div className='py-5 flex gap-5 items-center'>
              <img src={product.images[0]} className='w-20' />
              <div>
                <p className='font-semibold text-sm text-gray-700'>
                  {product.name}
                </p>
                <div className='flex gap-5 text-sm'>
                  <p>
                    Price: {currency}
                    {product.price}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Size: {product.size}</p>
                </div>
                <p className='text-sm'>
                  Date:
                  <span className='text-gray-500 font-600 ml-1'>
                    {new Date(product.date).toDateString()}
                  </span>

                  
                </p>
                <p className='text-sm'>
                  Payments: <span>{product.paymentMethod.toUpperCase()}</span>
                </p>
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              <p className='h-2 w-2 bg-green-600 rounded-full'></p>
              <p className='text-gray-500'>{product.status}</p>
            </div>
            <button  onClick={getOrders}  className='border border-gray-300 text-sm font-semibold text-gray-600 rounded py-2 px-4 cursor-pointer'>
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
