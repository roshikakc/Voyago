import React from 'react'
import { Link } from 'react-router-dom';
import t1 from './../assets/image/t1.png';
import t2 from './../assets/image/t2.jpeg';
import t3 from './../assets/image/t3.png';


export default function home() {
  return (
  <div className='flex flex-col md:flex-row items-center md:itemd-start gap-8 p-8'>
    {/* text  */}
    <div className='md:w-1/2 flex flex-col justify-center gap-4'>
    <h4 className='text font-bold'>Explore the world </h4>
    <h1 className='text-4xl font-bold'>Get out of the house and let's travel</h1>
    <p className='text-gray-600 text-lg'>Welcome to Voyago, your ultimate travel companion for exploring the world! Whether you're seeking beaches, bustling cityscapes, or hidden gems off the beaten path, we're here to inspire and guide your adventures.</p>
    <Link to="/plan" className=' inline-block btn  px-6 py-3 rounded-lg w-max hover:bg-blue-700 transition'>Plan your trip
    </Link>
    </div>
  </div>


  )
}
