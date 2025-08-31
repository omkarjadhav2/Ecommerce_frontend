import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterbox from "../components/NewsLetterbox";

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}></Title>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>These are best products in the world dont miss the opportunity These are best products in the world dont miss the opportunity These are best products in the world dont miss the opportunity</p>
        <p>These are best products in the world dont miss the opportunity These are best products in the world dont miss the opportunity</p>
        <b className='text-gray-600'>Our Mission</b>
        <p>These are best products in the world dont miss the opportunity</p>
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={"CHOOSE US"}></Title>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>These are best products in the world dont miss the opportunity</p>
          </div> 
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>These are best products in the world dont miss the opportunity</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>These are best products in the world dont miss the opportunity</p>
          </div>

      </div>
      <NewsLetterbox></NewsLetterbox>
      
    </div>
  )
}

export default About