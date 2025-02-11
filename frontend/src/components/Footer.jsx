import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col gap-4 justify-center'>

        <div className='flex flex-col sm:flex-row gap-12 my-10'>
            <div className='flex flex-col items-center sm:items-start gap-3 sm:w-3/4 w-full' >
                <img src={assets.logo} alt="logo-icon" className='w-32'/>
                <p className='text-sm text-center sm:text-start text-gray-500 w-3/4'>
                    An e-commerce website is a digital platform that allows businesses to sell products or services online. Here are some key elements to consider when building or understanding e-commerce websites:
                </p>
            </div>

            <div className=' flex flex-col items-center sm:items-start gap-3 sm:w-1/4 w-full'>
                <h1 className='font-medium font-semibold'>COMPANY</h1>

                <ul className='text-sm text-gray-500  text-center sm:text-start'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className='flex flex-col items-center sm:items-start gap-3 sm:w-1/4 w-full '>
                <h1 className='font-medium font-semibold '>GET IN TOUCH</h1>

                <ul className='text-sm text-gray-500  text-center sm:text-start'>
                    <li>
                        <a href="tel:7549766215">
                            7549766215
                        </a>
                    </li>

                    <li className='w-full'>
                        <a href="mailto:shamsherkhan7549@gmail.com?subject=Contact%20from%20Website" className='break-all'>
                          shamsherkhan7549@gmail.com
                        </a>
                    </li>

                    <li>
                        <a href="https://github.com/Shamsherkhan7549">
                        Github
                        </a>
                    </li>
                </ul>
            </div>
       </div>


        <hr />
        <div>
            <p className='text-sm text-gray-600 text-center py-4'>
                Copyright 2024 shamsherkhan7549@gmail.com - All Right Reserved.
            </p>

        </div>
       
    </div>

    
  )
}

export default Footer