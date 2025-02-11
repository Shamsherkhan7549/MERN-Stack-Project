import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)
    
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"CART"} text2={"TOTAL"}/>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex  justify-between text-sm'>
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <hr />
                <div className='flex  justify-between text-sm'>
                    <p>Shipping Fee</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>
                <hr className='' />
                <div className='flex  justify-between font-semibold text-sm'>
                    <p >Total</p>
                    <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount()+delivery_fee}.00</p>
                </div>

            </div>

        </div>
        
    </div>
  )
}

export default CartTotal