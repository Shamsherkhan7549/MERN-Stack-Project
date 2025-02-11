import React from 'react'
import  Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className='mt-5 flex flex-col gap-20 items-center sm:mx-20 mx-5'>
        <div className='text-2xl'>
           <Title text1={'CONTACT'} text2={'US'}/>
        </div>

        <div className='w-full flex flex-col sm:flex-row gap-10 sm:mx-10 mx-2'>
          <img src={assets.contact_img} className='sm:w-[55%] '/>
          <div className='flex flex-col gap-5 justify-center'>
             <h3 className='font-semibold text-lg text-gray-600'>Our Store</h3>
             <p className='text-gray-500 leading-6'>
                110033 Moolchand colony <br />
                Adarsh Nagar, New Delhi, India
             </p>
             
             <p className='text-gray-500 leading-6'>
                Tel: (+91) 7549766215 <br />
                Email: shamsherkhan7549@gmail.com
              </p>

             <h2 className='font-semibold text-lg text-gray-600'>Careers at Forever</h2>

             <p className='text-gray-500 leading-6'>Learn more about our teams and job openings.</p>

             <div className='text-start'><button className='px-7 py-4 text-sm border border-gray-700 hover:bg-black hover:text-white transition'>Explore Jobs</button></div>
          </div>
        </div>

        <div className='w-full'>
          <NewsletterBox/>
        </div>
    </div>
  )
}

export default Contact