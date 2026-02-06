import React from "react";
import { GrAttraction } from "react-icons/gr";



export const DestinationDetails = ({
    image,
    title,
    subtitle,
    overview,
    attractions = [],
    stays = [],
    bestTime
}) => {
    return (
        <div className='bg-gray-50 text-gray-800 min-h-screen'>
            {/* Header section  */}
            <header className='relative h-96'>
                <img src={image} alt='{title}' className='w-full h-full object-cover brightness-75' />

                <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center'>
                    <h1 className='text-5xl font-bold mb-4 drop-shadow-lg'>{title}</h1>
                    <p className='max-w-2xl text-lg'>{subtitle} </p>
                </div>
            </header>

            {/* overview section  */}
            <section className='px-6 mx:px-16 p-12'>
                <h2 className='text-3xl font-semibold mb-4'>Overview</h2>
                <p className='text-gray-700 leading-relaxed'>{overview}</p>
            </section>

            {/* top attractions */}
            <section className='px-6 md:px-16 py-12 bg-white'>
                <h2 className='text-3xl font-semibold mb-8'>Top Attractions</h2>

                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {attractions.map((place, index) => (
                        <div
                            key={index}
                            className='bg-white border border-[#e7d8c9] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 relative'
                        >
                            {/* Top Accent */}
                            <div className='absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-[#0c4759] to-[#0c4760]' />

                            {/* Emoji Badge */}
                            <div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl rounded-full bg-[#faf3eb] border-2 border-[#e4c6a2] shadow'>
                                {place.emoji}
                            </div>

                            <h3 className='text-xl font-semibold text-center'>{place.title}</h3>
                        </div>
                    ))}
                </div>
            </section>



            {/* where to stay  */}
    
<section className='px-6 md:px-16 py-12'>
  <h2 className='text-3xl font-semibold mb-8'>Where to Stay</h2>

  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
    {stays.map((stay, index) => (
      <div
        key={index}
        className='bg-white border border-[#e7d8c9] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 relative'
      >
        {/* Top Accent */}
        <div className='absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-[#0c4759] to-[#0c4760]' />

        {/* Emoji Badge */}
        <div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl rounded-full bg-[#faf3eb] border-2 border-[#e4c6a2] shadow'>
          {stay.emoji}
        </div>

        <h3 className='text-xl font-semibold text-center'>
          {stay.title || stay.desc}
        </h3>
      </div>
    ))}
  </div>
</section>


            {/* best time to visit  */}
            <section className='px-6 md:px-16 py-12 mb-25'>
                <h2 className='text-3xl font-semibold mb-8'>Best time to visit</h2>
                <p className='text-gray-700 leading-relaxed'>{bestTime} </p>
            </section>
        </div>
    );
};