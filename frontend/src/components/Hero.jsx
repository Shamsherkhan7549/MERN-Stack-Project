import React from 'react'
import { assets } from '../assets/assets'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center border border-grey-700'>
        {/* Hero left side */}
       <div className='flex flex-col w-full sm:w-1/2 items-center justify-center py-10 sm:py-0 gap:4'>
           <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                  <p className='w-8 md:w-11  h-[1px] bg-[#414141]'></p>
                  <p className='fond-medium text-sm md:text-base'>OUR BEST SELLER</p>
              </div>
              <h1 className='prata-regular  text-sm:3xl sm:py-3 lg:text-5xl leading'>LATEST ARRIVALS</h1>
              <div className='flex items-center gap-2'>
                  <p className='font-semibold text-sm md:text-base cursor-pointer'>SHOP NOW</p>
                  <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
              </div>
           </div>
       </div>

        {/* Hero right side */}

       <img src={assets.hero_img} alt="hero-img" className='w-full sm:w-1/2' />
    </div>
  )
}

export default Hero