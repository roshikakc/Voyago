import React, {useState, useEffect}from 'react'
import { Link, useLocation } from 'react-router-dom';
import {useAuth} from "./../components/AuthContext";
import t1 from './../assets/image/t1.png';
import t2 from './../assets/image/t2.jpeg';
import t3 from './../assets/image/t3.png';
import { FaArrowRight } from 'react-icons/fa';
import { AboutUsCard } from '../components/about-us-card';
import { DestinationCard } from '../components/destination-card';

const AboutUsData = [
    {
        id: 1,
        label: "50K+",
        description: "Destination"
    },
    {
        id: 2,
        label: "50K+",
        description: "Itineraries"
    },
    {
        id: 3,
        label: "25K+",
        description: "Happy travellers"
    },
]





export default function Home() {

    const { isAuthenticated } = useAuth();
    const location = useLocation();

     const [destinations, setDestinations] = useState([]);
    
        useEffect(() => {
            const fetchDestinations = async () => {
                try {
                     const desiredNames = ["Pattaya city", "Sapporo", "Seoul", "Zurich", "Kyoto"]
                     const query = desiredNames.map(n=> encodeURIComponent(n)).join(',');

                    // from database 
                    const res = await fetch(`http://localhost:5000/api/destination?names=${query}`);
                    const data = await res.json();
                    console.log("Loaded from DB:", data);
    
                    //if missing, fetch them individually
                    const foundNames = data.map(d => d.name);
                    const missing = desiredNames.filter(n => !foundNames.includes(n));
    
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
        <>
            <section className='flex flex-col md:flex-row items-center justify-between gap-12 px-8 pb-30 md:px-16 py-16  relative '>
                {/* text  */}
                <div className='md:w-1/2 flex flex-col gap-4'>
                    <h4 className='text font-semibold flex items-center gap-2'>Explore the world </h4>
                    <h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>Get out of the house and let's travel</h1>
                    <p className='text-gray-600 text-lg'>Welcome to Voyago, your ultimate travel companion for exploring the world! Whether you're seeking beaches, bustling cityscapes, or hidden gems off the beaten path, we're here to inspire and guide your adventures.</p>
                    <Link to={isAuthenticated ? "/plan" : "/login"} state={{from: location.pathname}}
                     className="inline-block px-6 py-3 text-xl font-bold rounded-lg bg-[#0c4160] text-[#ccd8e4] hover:bg-[#134a7c] hover:text-white w-full w-max transition-all duration-300 transform hover:scale-105 shadow-md"> Plan your trip</Link>


                </div>

                {/* cards */}
                <div className='flex gap-8 items-center md:w-1/2'>
                    <div className='rounded-2xl overflow-hidden shadow-lg h-[400px] w-[300px] bg-cover bg-center' style={{ backgroundImage: `url(${t1})` }}></div>

                    <div className='flex flex-col gap-8'>
                        <div className='rounded-2xl overflow-hidden shadow-lg h-[200px] w-[290px] bg-cover bg-center' style={{ backgroundImage: `url(${t2})` }}></div>
                        <div className='rounded-2xl overflow-hidden shadow-lg h-[200px] w-[290px] bg-cover bg-center' style={{ backgroundImage: `url(${t3})` }}></div>
                    </div>
                </div>
            </section>

            {/* about us section  */}
            < section className=' max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 p-20 bg-[#738fa7] rounded-3xl shadow-md min-h-[30rem]'>
                <div className='md:w-1/2 relative flex justify-center items-start'>
                    {/* back card  */}
                    <div className='bg-gray-300 rounded-2xl shadow-lg w-[21rem] h-[21rem] md:w-[22rem] md:h-[22rem] relative z-0'>
                        <img src={t2} alt='Back img' className='w-full h-full object-cover rounded-2xl' />
                    </div>

                    {/* front card */}
                    <div className='bg-blue-600 rounded-2xl shadow-xl w-[19rem] h-[19rem] md:w-[19rem] md:h-[19rem] absolute top-1/4 left-1/2.5 -ml-40 md:-ml-48 z-10'>
                        <img src={t1} alt='front img' className='w-full h-full object-cover rounded-2xl' />
                    </div>
                </div>

                <div className='md:w-1/2 flex flex-col gap-6 '>
                    <h2 className='text-xl md:text-4xl font-bold'>About Us</h2>
                    <p className='text-gray-900 text-lg'> Voyago is your ultimate travel companion for exploring the world! Whether you're seeking beaches, bustling cityscapes, or hidden gems off the beaten path, we're here to inspire and guide your adventures.</p>

                    <div className='flex gap-4'>
                        {
                            AboutUsData.map((data) => (
                                <AboutUsCard key={data.id} label={data.label} description={data.description} />
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* plan */}
            <section className='flex flex-col gap-4 py-24 items-center '>
                <h1 className='text-xl md:text-4xl font-bold'>Plan your trip in 3 simple steps</h1>
                <h4 className='text-xl text-gray-400 '>From idea to itinerary in minutes</h4>

                <div className='flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl w-full pt-8 '>
                    <div className='flex-1 flex flex-col gap-2 items-center text-center'>
                        <span className='text-7xl text-gray-300 font-bold '>01</span>
                        <h2 className='text-3xl'>Share Your Preferences </h2>
                        <h3 className='text-xl text-gray-400'>Tell us where you want to go, your budget, dates, and interests</h3>
                    </div>

                    <div className='flex-1 flex flex-col gap-2 items-center text-center'>
                        <span className='text-7xl text-gray-300 font-bold '>02</span>
                        <h2 className='text-3xl'>Creates your plan </h2>
                        <h3 className='text-xl text-gray-400'>Uses different algorithm to build your perfect itinerary</h3>
                    </div>

                    <div className='flex-1 flex flex-col gap-2 items-center text-center'>
                        <span className='text-7xl text-gray-300 font-bold '>03</span>
                        <h2 className='text-3xl'>Explore & customize </h2>
                        <h3 className='text-xl text-gray-400'>Review your personalized plan and make any adjustments you'd like</h3>
                    </div>

                </div>
            </section>

            {/* destinations  */}
            < section className=' max-w-7xl mx-auto flex flex-col  items-center gap-4 p-14 mt-17 bg-[#ccd8e4] rounded-4xl shadow-md min-h-[50rem] text-center'>
                <h4 className='text-xl  text-[#0c4160] flex items-center gap-2'>Destinations </h4>
                <h1 className='text-xl md:text-4xl font-bold'>Let's explore your popular Destination</h1>
                <h4 className='text-xl text-gray-500 '>Explore some of our most loved travel spots</h4>

                <div className='flex flex-wrap gap-6 justify-center py-6'>
                                {destinations
                                    // .filter(dest => dest && dest.name) // ensures defined
                                    .map(dest => (
                                        <DestinationCard key={dest._id || dest.name}
                                            id={dest._id} image={dest.photoUrl} title={dest.name}
                                            location={dest.country} />
                                    ))}
                
                
                            </div>
                <Link to="/destination" className=' px-6 py-3 text-xl font-bold rounded-lg bg-[#0c4160] text-[#ccd8e4] hover:bg-[#134a7c] hover:text-white w-full md:w-max text-center transition-all duration-300 transform hover:scale-105 shadow-md'>
                    More destinations
                </Link>
            </section>

            {/* last part */}
            <section className='flex flex-col gap-6 py-24 items-center my-25  bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 '>
                <h1 className='text-xl md:text-4xl font-bold'>Ready to start your adventure?</h1>
                <h4 className='text-xl text-gray-400 '>Join thousands of travellers who trust voyago to plan their perfect trips</h4>
                <Link to="/plan" className="inline-flex items-center px-6 py-3 text-xl font-bold rounded-lg bg-[#0c4160] text-[#ccd8e4] hover:bg-[#134a7c] hover:text-white w-full md:w-max text-center transition-all duration-300 transform hover:scale-105 shadow-md gap-2"> Plan your trip <FaArrowRight className="text-lg" /> </Link>
            </section>
        </>
    )
}
