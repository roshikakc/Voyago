import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { DestinationCard } from '../components/destination-card';

export default function DestinationPage() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                // from database 
                const res = await fetch(`http://localhost:5000/api/destination/`);
                const data = await res.json();
                console.log("Loaded from DB:", data);

                const names = data.map(d => d.name);
                const desiredNames = ["Kathmandu", "Barcelona", "Istanbul", "Paris", "Cape Town",
                    "Rome", "Prague", "Marrakesh", "Oslo"


                ]

                const missing = desiredNames.filter(n => !names.includes(n));

                let apiData = [];
                if (missing.length > 0) {
                    console.log("Fetching ,issing destinations:", missing);
                    apiData = await Promise.all(
                        missing.map(async (n) => {
                            try {
                                const res = await fetch(`http://localhost:5000/api/destination/${n}`);
                                if (!res.ok) throw new Error("Failed to fetch " + n);
                                return await res.json();
                            } catch (err) {
                                console.error("Error fetching:", n, err);
                                return null;
                            }
                        })
                    );
                }

                const merged = [...data, ...apiData.filter(Boolean)]; //merging database and api data

                const unique = merged.filter(
                    (item, index, self) =>
                        index === self.findIndex(
                            (d) => d._id === item._id || d.name === item.name
                        )
                );
                setDestinations(unique);
            } catch (err) {
                console.error("Error loading destinations:", err);

            }
        };
        fetchDestinations();
    }, []);

    return (

        < section className=' max-w-7xl mx-auto flex flex-col  items-center gap-4 p-14 mt-17 mb-20 
          bg-gradient-to-b from-white via-blue-50 to-white rounded-4xl shadow-[0_-8px_20px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.1)] 
          text-center'>
            <h4 className='text-xl  text-[#0c4160] flex items-center gap-2'>Destinations </h4>
            <h1 className='text-xl md:text-4xl font-bold'>Let's explore your popular Destination</h1>
            <h4 className='text-xl text-gray-500 '>Explore some of our most loved travel spots</h4>

            <div className='flex flex-wrap gap-6 justify-center py-6'>
                {destinations.map(dest => (
                    <DestinationCard key={dest._id || dest.name}
                        id={dest._id} image={dest.photoUrl} title={dest.name}
                        location={dest.country} />
                ))}


            </div>
        </section>

    )
}

