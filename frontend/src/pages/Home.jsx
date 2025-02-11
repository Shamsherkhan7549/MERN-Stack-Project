import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellersProduct from '../components/BestSellersProduct'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSellersProduct/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home