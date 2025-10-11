import React from 'react'
import { Link } from 'react-router-dom';
import t1 from './../assets/image/t1.png';


export default function DestinationDetails() {
    return (
        <div className='bg-gray-50 text-gray-800 min-h-screen'>
            {/* Header section  */}
            <header className='relative h-96'>
                <img src={t1} alt='Bali' className='w-full h-full object-cover brightness-75' />

                <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center'>
                    <h1 className='text-5xl font-bold mb-4 drop-shadow-lg'>Bali, Indonesia</h1>
                    <p className='max-w-2xl text-lg'>
                        Explore the Island of the Gods — where lush jungles, beaches, and temples meet.
                    </p>
                </div>
            </header>

            {/* view section  */}
            <section className='px-6 mx:px-16 p-12'>
                <h2 className='text-3xl font-semibold mb-4'>Overview</h2>
                <p className='text-gray-700 leading-relaxed'>
                    Bali is a tropical paradise known for its forested volcanic mountains, iconic rice paddies,
                    beaches, and coral reefs. The island is home to religious sites such as the cliffside Uluwatu Temple
                    and offers world-class surfing, diving, and cultural experiences.
                </p>
            </section>

            {/* top attractions */}
            <section className='px-6 md:px-16 py-12 bg-white'>
                <h2 className='text-3xl font-semibold mb-8'>Top Attractions</h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    {[
                        {
                            title: "Uluwatu Temple",
                            img: "https://images.unsplash.com/photo-1601918774946-2587a7a1a1b1",
                        },
                        {
                            title: "Tegallalang Rice Terrace",
                            img: "https://images.unsplash.com/photo-1549887534-4c1a8d3dd8b3",
                        },
                        {
                            title: "Mount Batur",
                            img: "https://images.unsplash.com/photo-1534297635766-a262cdcb96f5",
                        },
                    ].map((place) => (
                        <div key={place.title} className='bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden'>
                            <img src={place.img} alt={place.title} className='w-full h-56 object-cover' />
                            <div className='p-4'>
                                <h3 className='text-xl font-semibold mb-2'>{place.title}</h3>
                                <p className='text-gray-600 text-sm'>
                                    A must-visit spot offering stunning views and rich Balinese culture.
                                </p>
                            </div>
                        </div>

                    ))}
                </div>
            </section>

            {/* where to stay  */}
            <section className='px-6 md:px-16 py-12'>
                <h2 className='text-3xl font-semibold mb-8'>Where to stay</h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    <div className='bg-gray-100 rounded-lg shadow p-6'>
                        <h3 className='text-xl font-semibold mb-2'>Luxury — Four Seasons Resort Bali</h3>
                        <p className='text-gray-700 text-sm'>
                            Experience unmatched luxury amidst tropical gardens and ocean views.
                        </p>
                    </div>
                    <div className='bg-gray-100 rounded-lg shadow p-6'>
                        <h3 className='text-xl font-semibold mb-2'>Luxury — Four Seasons Resort Bali</h3>
                        <p className='text-gray-700 text-sm'>
                            Experience unmatched luxury amidst tropical gardens and ocean views.
                        </p>
                    </div>
                </div>
            </section>

            {/* best time to visit  */}
            <section className='px-6 md:px-16 py-12 mb-25'>
                <h2 className='text-3xl font-semibold mb-8'>Best time to visit</h2>
                <p className='text-gray-700 leading-relaxed'>
                    The best time to visit Bali is during the **dry season (April to October)**, when the weather is
                    sunny and ideal for beaches and outdoor adventures. Avoid the wet season (November to March) for a
                    smoother travel experience.
                </p>
            </section>

            
        </div>
    );

};

