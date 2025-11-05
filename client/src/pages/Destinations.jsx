import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { DestinationCard } from '../components/destination-card';

export default function DestinationPage() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const names = ["Kathmandu", "Tokyo", "Paris", "New York", "Rome", "Cairo",
                "Rio de Janeiro", "Barcelona", "Istanbul", "Sydney", "Cape town", "Canada"];
            const all = await Promise.all(
                names.map(async (n) => {
                    const res = await fetch(`http://localhost:5000/api/destination/${n}`);
                    return await res.json();
                })
            );
            setDestinations(all);
        };
        loadData();
    }, []);

    return (

        < section className=' max-w-7xl mx-auto flex flex-col  items-center gap-4 p-14 mt-17 mb-20 
          bg-gradient-to-b from-white via-blue-50 to-white rounded-4xl shadow-[0_-8px_20px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.1)] 
          text-center'>
            <h4 className='text-xl  text-[#0c4160] flex items-center gap-2'>Destinations </h4>
            <h1 className='text-xl md:text-4xl font-bold'>Let's explore your popular Destination</h1>
            <h4 className='text-xl text-gray-500 '>Explore some of our most loved travel spots</h4>

            <div className='flex flex-wrap gap-6 justify-center py-6'>
                {destinations
                    .filter(dest => dest && dest.name) // ensures defined
                    .map(dest => (
                        <DestinationCard key={dest.name} title={dest.name.toLowerCase()} />
                    ))}


            </div>
        </section>

    )
}

