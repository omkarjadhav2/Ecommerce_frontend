import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-sx sm:text-sm md:text-base text-gray-700 '>
        <div>
            <img className='w-12 m-auto mb-5' src= {assets.exchange_icon} alt="exchange_icon" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400 '>We offer hassel free exchange Policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src= {assets.quality_icon} alt="quality_icon" />
            <p className='text-gray-400 '>7 days return Policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src= {assets.support_img} alt="support_img" />
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400 '>We provide 24/7 customer support</p>
        </div>

    </div>
  )
}

export default OurPolicy