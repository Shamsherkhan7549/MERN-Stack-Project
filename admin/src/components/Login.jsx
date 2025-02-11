import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { ToastContainer, toast } from 'react-toastify';
const Login = ({setToken}) => {

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const handlingChange = (event) => {
    setFormData(currData => {
        return {...currData,[event.target.name]:event.target.value }
    }) 
  }

  const handlingSubmit = async(event) => {
   try{
    event.preventDefault();
    const {email, password} = formData
    console.log(backendUrl)
    const response = await axios.post(backendUrl+'/user/admin', {email,password})
    if(response.data.success){
      setToken(response.data.token)
      return
    }else{
      toast.error(response.data.message)
    }
   
    setFormData({
       email:"",
       password:""
    })

   }catch(error){
      console.log(error)
      toast.error(error.message)

   }

  }
 
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
    <div className='bg-white shadow-md ronded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form action="" onSubmit={handlingSubmit}>
            <div className='mb-3 min-w-72'>
                <label className='text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                <input className='rounded-md w-full px-3 border border-ggray-300 ouline-none' value={formData.email} onChange={handlingChange} name='email' type='email' placeholder='your@gmail.com' required />
            </div>
            <div className='mb-3 min-w-72'>
                <label className='text-sm font-medium text-gray-700 mb-2'>Password</label>
                <input className='rounded-md w-full px-3 border border-ggray-300 ouline-none' value={formData.password} onChange={handlingChange} name='password' type='password' placeholder='Enter Your Password' required />
            </div>
            <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
        </form>
    </div>
    </div>
  )
}

export default Login