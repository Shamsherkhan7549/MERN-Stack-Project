import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='mt-10 flex flex-col items-center   '>
        <div className='text-2xl'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>

        <div className='mt-10 flex gap-20 items-center flex-col sm:flex-row '> 
          <img src={assets.about_img} alt="" className='sm:w-[40%] w-full px-10 sm:px-0' />

          <div className='flex flex-col gap-10 text-gray-600  leading-6 pr-10 px-10 sm:px-0'>
              <p>
                Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
              </p>
              <p>
                Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
              </p>

              <h3 className='text-black font-semibold'>Our Mission</h3>

              <p>
                Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
              </p>
          </div>
        </div>

        <div className='mt-10 px-10 sm:px-0'>
          <div className='text-2xl'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
          </div>

          <div className='mt-10 flex flex-col sm:flex-row '>
            <div className='px-20 py-20 border border-gray-300  w-full'>
               <h3 className='font-semibold text-sm py-5'>Quality Assurance:</h3>
               <p className='text-sm text-gray-600 leading-5'>
                  We meticulously select and vet each product to ensure it meets our stringent quality standards.
               </p>
            </div>

            <div className='px-20 py-20 border border-gray-300 w-full'>
               <h3 className='font-semibold text-sm py-5'>Convenience:</h3>
               <p className='text-sm text-gray-600 leading-5'>
                   With our user-friendly interface and hassle-free ordering process, shopping has never been easier. 
               </p>
            </div>

            <div className=' px-20 py-20 border border-gray-300 w-full'>
               <h3 className='font-semibold text-sm py-5'>Exceptional Customer Service:</h3>
               <p className='text-sm text-gray-600 leading-5'>
                  Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
               </p>
            </div>

          </div>
        </div>

        <div className='w-full mt-20 mb-20'>
           <NewsletterBox/>
        </div>
    </div>
  )
}

export default About