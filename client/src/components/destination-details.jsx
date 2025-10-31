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
                <div className='grid md:grid-cols-3 gap-8'>
                    {attractions.map((place, index) => (
                        <div key={index} className='bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden'>
                            <img src={place.img} alt={place.title} className='w-full h-56 object-cover' />
                            <div className='p-4'>
                                <h3 className='text-xl font-semibold mb-2'>{place.title}</h3>
                                <p className='text-gray-600 text-sm'>{place.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* where to stay  */}
            <section className='px-6 md:px-16 py-12'>
                <h2 className='text-3xl font-semibold mb-8'>Where to stay</h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    {stays.map((stays, index) => (
                        <div key={index} className='bg-gray-100 rounded-lg shadow p-6'>
                            <h3 className='text-xl font-semibold mb-2'>{stays.name}</h3>
                            <p className='text-gray-700 text-sm'>{stays.desc}</p>
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