import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Plan() {
    const [formData, setFormData] = useState({
        country: "",
        city: "",
        startDate: "",
        endDate: "",
        budget: "",
        travellers: "",
        interests: "",

    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.country.trim()) newErrors.country = "Country is required.";
        if (!formData.city.trim()) newErrors.city = "City is required.";
        if (!formData.startDate) newErrors.startDate = "Start date is required.";
        if (!formData.endDate) newErrors.endDate = "End date is required.";
        if (!formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = "End date cannot be before start date.";
        }
        if (!formData.budget) newErrors.budget = "Please select a budget.";
        if (!formData.travellers || formData.travellers < 1)
            newErrors.budget = "Must have at least one traveller.";
        if (!formData.interests.trim()) newErrors.interests = "Interests is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;
        console.log("Form submitted:", formData);

        navigate('/itinerary');
    }

    return (
        <>
            < div className='flex flex-col gap-4 p-14 mt-3
        text-center'>
                <h1 className='text-xl md:text-4xl font-bold'>Plan your perfect journey</h1>
                <h4 className='text-xl text-gray-500 '>Tell us your dream trip and we'll create a personalized itinerary just for you</h4>
            </div>

            <section className='max-w-4xl mx-auto p-10 mt-5 mb-25
               bg-gradient-to-b from-white via-blue-50 to-white rounded-4xl  shadow-[0_-8px_20px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.1)] 
               rounded-4xl '>

                <h2 className='text-3xl text-gray-600 md:text-4xl font-semibold text-center mb-6'>Trip Details</h2>
                <form onSubmit={handleSubmit} className='space-y-10'>
                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-2'>Country</label>
                        <input type='text' name='country' value={formData.country} onChange={handleChange}
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            placeholder='Which country do you want to go?' />
                        {errors.country && <p className='text-red-500 text-sm mt-1'>{errors.country}</p>}
                    </div>

                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-1'>City</label>
                        <input type='text' name='city' value={formData.city} onChange={handleChange}
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            placeholder='Enter city' />
                        {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
                    </div>

                    {/* date */}
                    <div>
                        <div className='grid grids-cols-1 md:grids-cols-2 gap-5'>
                            <label className='w-32 text-xl text-gray-700 font-semibold'>Start Date</label>
                            <input type='date' name='startDate' value={formData.startDate} onChange={handleChange}
                                className='flex-1 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            />
                            {errors.startDate && <p className='text-red-500 text-sm mt-1'>{errors.startDate}</p>}

                            <label className='text-xl text-gray-700 font-semibold mb-1'>End Date</label>
                            <input type='date' name='endDate' value={formData.endDate} onChange={handleChange}
                                className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            />
                            {errors.endDate && <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>}
                        </div>
                    </div>

                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-1'>Budget Range</label>
                        <select name='budget' value={formData.budget} onChange={handleChange}
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400 text-gray-700 invalid:text-gray-400'
                        >
                            <option value='' disabled >Select your budget</option>
                            <option value='20,000'>Rs.10,000 - Rs.20,000</option>
                            <option value='30,000'>Rs.20,000 - Rs.30,000</option>
                            <option value='40,000'>Rs.30,000 - Rs.40,000</option>
                            <option value='50,000'>Rs.40,000 - Rs.50,000</option>
                            <option value='60,000'>Rs.50,000 - Rs.60,000</option>
                            <option value='60,001'>Above Rs.60,000</option>
                        </select>

                        {errors.budget && <p className='text-red-500 text-sm mt-1'>{errors.budget}</p>}
                    </div>
                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-1'>Number of travellers</label>
                        <input type='number' name='travellers' value={formData.travellers} onChange={handleChange} placeholder='Number of travellers'
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            min='1' max='20' />
                            {errors.travellers && <p className='text-red-500 text-sm mt-1'>{errors.travellers}</p>}
                    </div>
                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-1'>Interests</label>
                        <textarea name='interests' value={formData.interests} onChange={handleChange} rows='3'
                            placeholder='e.g. beaches, hiking, museums...'
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400' >
                        </textarea>
                        {errors.interests && <p className='text-red-500 text-sm mt-1'>{errors.interests}</p>}
                    </div>

                    <button type='submit' className='w-full border bg-[#0c4160] text-[#ccd8e4] text-extrabold text-xl py-2 rounded-md cursor-pointer'>Generate</button>

                </form>

            </section>
        </>
    );
}
