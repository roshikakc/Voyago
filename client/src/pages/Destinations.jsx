import React from 'react'
import { Link } from 'react-router-dom';
import t1 from './../assets/image/t1.png';
import t2 from './../assets/image/t2.jpeg';
import t3 from './../assets/image/t3.png';
import { FaArrowRight } from 'react-icons/fa';

export default function Destination(){
    return (
         < section className=' max-w-7xl mx-auto flex flex-col  items-center gap-4 p-14 mt-17 mb-20 
          bg-gradient-to-b from-white via-blue-50 to-white rounded-4xl shadow-[0_-8px_20px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.1)] 
          text-center'>
                        <h4 className='text-xl  text-[#0c4160] flex items-center gap-2'>Destinations </h4>
                        <h1 className='text-xl md:text-4xl font-bold'>Let's explore your popular Destination</h1>
                        <h4 className='text-xl text-gray-500 '>Explore some of our most loved travel spots</h4>
        
                      <div className='flex flex-wrap gap-6 justify-center py-6'>
                        {/* card1 */}
                        <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                            <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                                <img src={t1} alt='place' className='w-full h-full object-cover'/>
                            </div>
        
                            <div className='p-4 flex flex-col items-center'>
                                <h3 className='text-xl font-bold text-gray-800'>Bali</h3>
                                <p className='text-gray-500 text-sm mt-1'>Indonesia</p>
                            </div>
                            </div> 
                        {/* card2 */}
                        <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                            <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                                <img src={t1} alt='place' className='w-full h-full object-cover'/>
                            </div>
        
                            <div className='p-4 flex flex-col items-center'>
                                <h3 className='text-xl font-bold text-gray-800'>Bali</h3>
                                <p className='text-gray-500 text-sm mt-1'>Indonesia</p>
                            </div>
                            </div> 
                        {/* card3 */}
                        <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                            <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                                <img src={t1} alt='place' className='w-full h-full object-cover'/>
                            </div>
        
                            <div className='p-4 flex flex-col items-center'>
                                <h3 className='text-xl font-bold text-gray-800'>Bali</h3>
                                <p className='text-gray-500 text-sm mt-1'>Indonesia</p>
                            </div>
                            </div> 
                        {/* card4 */}
                        <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                            <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                                <img src={t1} alt='place' className='w-full h-full object-cover'/>
                            </div>
        
                            <div className='p-4 flex flex-col items-center'>
                                <h3 className='text-xl font-bold text-gray-800'>Bali</h3>
                                <p className='text-gray-500 text-sm mt-1'>Indonesia</p>
                            </div>
                            </div> 
                        {/* card5 */}
                        <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                            <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                                <img src={t1} alt='place' className='w-full h-full object-cover'/>
                            </div>
        
                            <div className='p-4 flex flex-col items-center'>
                                <h3 className='text-xl font-bold text-gray-800'>Bali</h3>
                                <p className='text-gray-500 text-sm mt-1'>Indonesia</p>
                            </div>
                            </div> 
                        {/* card6 */}
                        <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                            <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                                <img src={t1} alt='place' className='w-full h-full object-cover'/>
                            </div>
        
                            <div className='p-4 flex flex-col items-center'>
                                <h3 className='text-xl font-bold text-gray-800'>Bali</h3>
                                <p className='text-gray-500 text-sm mt-1'>Indonesia</p>
                            </div>
                            </div> 
                      
                           
                        </div>
                    </section>
    )
}