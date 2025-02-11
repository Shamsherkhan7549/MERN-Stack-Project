import React from 'react'
import Policy from './Policy'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid sm:grid-cols-3 gap-4 my-10'>
        <Policy img={assets.exchange_icon} text1={"Easy Exchange Policy"} text2={"We offer hassle free exchange policy"}/>
        <Policy img={assets.quality_icon} text1={"7 Days Return Policy"} text2={"We provide 7 days free return policy"}/>
        <Policy img={assets.support_img} text1={"Best customer support"} text2={"we provide 24/7 customer support"}/>
    </div>
  )
}

export default OurPolicy