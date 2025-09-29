import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <Link to={"/collection"}>
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
           <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>Bold Leather</p>

            </div>
            <h1 className=' prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Modern Vintage</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

            </div>

           </div>

        </div>
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="hero_img" />
        

    </div>
    </Link>
  )
}

export default Hero