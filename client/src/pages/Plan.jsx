import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../components/AuthContext";




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

    //disabling yesterday's date
    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "budget" && Number(value) > 100000) {
            return;
        }
        setFormData({ ...formData, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.country.trim()) newErrors.country = "Country is required.";
        if (!formData.city.trim()) newErrors.city = "City is required.";
        if (!formData.startDate) newErrors.startDate = "Start date is required.";
        if (!formData.endDate) newErrors.endDate = "End date is required.";
        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = "End date cannot be before start date.";
        }
        if (!formData.budget) newErrors.budget = "Please select a budget.";
        if (!formData.travellers || formData.travellers < 1)
            newErrors.travellers = "Must have at least one traveller.";
        if (!formData.interests.trim()) newErrors.interests = "Interests is required.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const interestsArray = formData.interests
                .split(",")
                .map(i => i.trim())
                .filter(Boolean);

            const response = await fetch("http://localhost:5000/api/itinerary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    city: formData.city,
                    country: formData.country,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    budget: Number(formData.budget),
                    travellers: Number(formData.travellers),
                    interests: interestsArray
                })
            });

            const data = await response.json();
            navigate("/itinerary", { state: data });

        } catch (err) {
            console.error("Itinerary error:", err);
        }
    };

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
                        <input type='text' name='city' value={formData.city} onChange={handleChange} placeholder='e.g. Kathmandu, Lalitpur'
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                        />
                        {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
                    </div>

                    {/* date */}
                    <div>
                        <div className='grid grids-cols-1 md:grids-cols-2 gap-5'>
                            <label className='w-32 text-xl text-gray-700 font-semibold'>Start Date</label>
                            <input type='date' name='startDate' value={formData.startDate} onChange={handleChange} min={today}
                                className='flex-1 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            />
                            {errors.startDate && <p className='text-red-500 text-sm mt-1'>{errors.startDate}</p>}

                            <label className='text-xl text-gray-700 font-semibold mb-1'>End Date</label>
                            <input type='date' name='endDate' value={formData.endDate} onChange={handleChange} min={formData.startDate || today}
                                className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-400'
                            />
                            {errors.endDate && <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>}
                        </div>
                    </div>

                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-1'>Budget (Max Rs. 1,00,000)</label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            max={100000}
                            min={0}
                            placeholder="Enter budget (max 100000)"
                            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                        />

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
