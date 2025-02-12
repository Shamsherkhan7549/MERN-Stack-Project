import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Placeorder = () => {
   const {navigate, backendUrl, cartItems, setCartItems, getCartAmount, delivery_fee, products, token} = useContext(ShopContext)

   const [method, setMethod] = useState("cod");

   const[formData, setFormData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
   });

   const handlingChange = (event) => {
    setFormData(prevFormData=>(
      {...formData, [event.target.name]: event.target.value}
    ))
   };

   const handlingSubmit = async(event) => {
     event.preventDefault();
     
     try{

      let orderItems = []
      
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo = structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity =  cartItems[items][item]; 
              orderItems.push(itemInfo)
            }
          }
        }
      }

        let orderData = {
          address:formData,
          items:orderItems,
          amount:getCartAmount() + delivery_fee
        }

        switch(method){
          //API Calls for COD 
          case 'cod':   
          const response = await axios.post(backendUrl + '/order/place', orderData, {headers:{token}});
          if(response.data.success){
                setCartItems({});
                navigate('/orders')
              }else{
                toast.error(response.data.message)
              }
            break;
            case 'stripe':   
            const responseStripe = await axios.post(backendUrl + '/order/stripe', orderData, {headers:{token}});
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data;
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            
            break;

          default:
            break;
        }

     }catch(error){

     }
   }


  return (
    <form onSubmit={handlingSubmit} className='px-10 py-10 sm:px-0 sm:py-0'>
        <div className='text-2xl  mt-10'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex flex-col md:flex-row gap-20 mt-10 '>

          <div className='flex flex-col gap-5 md:flex-3 flex-4'>
            <div className='flex sm:flex-row flex-col sm:gap-3 gap-5'>
              <input type="text" placeholder='First name' onChange={handlingChange} name='firstName' value={formData.firstName} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required/>
              <input type="text" placeholder='Last name' onChange={handlingChange}  name='lastName' value={formData.lastName} className=' border-1 border-gray-300 pl-3 py-1  border rounded  w-full'  required/>
            </div>

            <div className='flex flex-col gap-5'>
              <input type="text" placeholder='Email address' onChange={handlingChange}  name='email' value={formData.email} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required/>
              <input type="text" placeholder='Street' onChange={handlingChange}  name='street' value={formData.street} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required />
            </div>

            <div className='flex flex-col sm:gap-3 gap-5'>
              <div className='flex sm:flex-row flex-col gap-5 sm:gap-3'>
                <input type="text" placeholder='City' onChange={handlingChange}  name='city' value={formData.city} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required/>
                <input type="text" placeholder='State' onChange={handlingChange}  name='state' value={formData.state} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required />
              </div>

              <div className='flex sm:flex-row flex-col sm:gap-3 gap-5'>
                <input type="number" placeholder='Zipcode' onChange={handlingChange}  name='zipcode' value={formData.zipcode} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required />
                <input type="text" placeholder='Country' onChange={handlingChange}  name='country' value={formData.country} className=' border-1 border-gray-300 pl-3 py-1 border rounded w-full' required />
              </div>
            </div>
            <input type="number" placeholder='Phone' onChange={handlingChange}  name='phone' value={formData.phone} className=' border-1 border-gray-300 pl-3 py-1 border rounded' required />

          </div>

          <div className='md:w-2/4 flex flex-col gap-20'>
            <div className=' '>
              <CartTotal />
            </div>

            <div className='flex flex-col gap-5 items-start'>
              <Title text1={"PAYMENT"} text2={"METHOD"}/>

              <div className='flex justify-around w-full'>
                <div onClick={()=>setMethod("stripe")} className='flex items-center gap-10 border border-gray-200 px-3 py-2'>
                  <p className='border border-gray-200  w-5 h-5 rounded-full active:bg-green-400 cursor-pointer'></p>
                  <img src={assets.googlePay_icon} className='w-8' />
                </div>

                <div onClick={()=>setMethod("razorpay")} className='flex items-center gap-6 border border-gray-200 px-3 py-2'>
                  <p className='border border-gray-200  w-5 h-5 rounded-full active:bg-green-400 cursor-pointer'></p>
                  <img src={assets.razorpay_logo} className='w-20' />
                </div>

                <div onClick={()=>setMethod("cod")} className='flex items-center gap-6 border border-gray-200 px-3 py-2'>
                  <p className='border border-gray-200  w-5 h-5 rounded-full active:bg-green-400 cursor-pointer'></p>
                  <p className='text-gray-500 text-4'>CASH ON DELIVERY</p>
                </div>
                
              </div>

              <div className='text-end w-full mt-3  '>
               <button type='submit'  className='bg-black text-white text-md px-10 py-2'>PLACE ORDER</button>

              </div>
            </div>

          </div>
        </div>

        
    </form>
  )
}

export default Placeorder