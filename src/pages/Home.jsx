import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterbox from '../components/NewsLetterbox'
import Carousel from '../components/Carousel'

const home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <LatestCollection></LatestCollection>
      <Hero></Hero>
      <BestSeller></BestSeller>
      <OurPolicy></OurPolicy>
      <NewsLetterbox></NewsLetterbox>
    </div>
  )
}

export default home