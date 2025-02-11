import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify';
import axios from 'axios'
const Login = () => {
  const [currState, setCurrState] = useState('Login')
  const{token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const[name, setName] = useState();
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();

  const submitHandler = async(event) => {
      event.preventDefault();
      try{
          if(currState === 'Sign Up'){
            const response = await axios.post(backendUrl+'/user/register',{name,email,password})

           if(response.data.success){
            setToken(response.data.token);
            localStorage.setToken('token', response.data.token);
            toast.success("Welcome to FOREVER clothing");
           }else{
            toast.error(response.data.message);
           }

          }else{

            const response = await axios.post(backendUrl+'/user/login',{email,password},{headers:{token}})
            console.log(response.data)
            if(response.data.success){
              setToken(response.data.token);
             localStorage.setItem('token', response.data.token);
             toast.success("Welcome Back to FOREVER clothing");

            }else{
              toast.error(response.data.message);
             }

          }

      }catch(err){
        toast.error(err.message)
      }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    
      <form onSubmit={submitHandler} className=' flex flex-col items-center gap-7 mt-20 '>
       
       <div className='flex gap-1 items-center'>
          <p className='prata-regular text-semibold text-3xl'>{currState}</p>
          <p className='h-[2px] w-10  bg-gray-700 '></p>
       </div>

        
        <div className='flex flex-col gap-5 w-full max-w-md'>
          {currState === "Sign Up" ? 
            <input type="text" placeholder='Name' onChange={e=>setName(e.target.value)}  className='border border-black px-3 py-2 w-full text-sm ' required/> : ""
          }
            <input type="email" placeholder='Email'onChange={e=>setEmail(e.target.value)}  className='border border-black px-3 py-2 w-full text-sm ' required/>
            <input type="password" placeholder='Password'onChange={e=>setPassword(e.target.value)} className='border border-black px-3 py-2 w-full text-sm ' required/>

            <div className='flex justify-between text-sm text-gray-600 w-full'>
            <p className='cursor-pointer'>Forgot your password?</p>
            {
              currState === 'Sign Up' ? 
              <p className='cursor-pointer' onClick={() => setCurrState("Login")}>Login account</p>
              :
              <p className='cursor-pointer' onClick={() => setCurrState("Sign Up")}>Create account</p>
            }
            </div>  
        </div>

        <button type='btn' className='bg-black text-white px-6 py-2 text-sm'>{currState ==='Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
   
  )
}

export default Login