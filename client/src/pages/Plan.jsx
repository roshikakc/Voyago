import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../components/AuthContext";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


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

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditMode = !!id || !!location.state?.editTrip;
    const [tripData, setTripData] = useState(location.state?.itinerary || { ...emptyTrip });
    const locationState = location.state?.itinerary;

    useEffect(() => {
        console.log("Plan component mounted. isEditMode:", isEditMode, "id:", id);

        fetch("http://localhost:5000/api/countries")
            .then(res => res.json())
            .then(data => setCountries(data))
            .catch(err => console.error("Country load error:", err));
    }, []);

    useEffect(() => {
        console.log("formData.country changed:", formData.country, "isEditMode:", isEditMode);
        if (!isEditMode && formData.country) {
            fetch(`http://localhost:5000/api/cities/${formData.country}`)
                .then(res => res.json())
                .then(data => setCities(data))
                .catch(err => console.error("City load error:", err));
        }
    }, [formData.country, isEditMode]);



    //disabling yesterday's date
    const today = new Date().toISOString().split("T")[0];

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === "budget" && Number(value) > 100000) {
            return;
        }
        if (name === "country") {
            setFormData({ ...formData, country: value, city: "" });
            setCities([]);

            try {
                const res = await fetch(`http://localhost:5000/api/cities/${value}`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.error("City load error:", err);
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        if (!isEditMode) return;

        const fetchTrip = async () => {
            try {
                const tripId = id || location.state?.itinerary?._id;
                const res = await fetch(`http://localhost:5000/api/itinerary/${tripId}`);
                const trip = await res.json();

                if (!trip.country || !trip.city) {
                    console.error("Trip data missing country or city", trip);
                    return;
                }

                // Populate form
                setFormData({
                    country: trip.country._id,
                    city: trip.city._id,
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    budget: trip.budget || "",
                    travellers: trip.travellers || "",
                    interests: (trip.interests || []).join(", "),
                });

                // Load cities for this country
                const cityRes = await fetch(`http://localhost:5000/api/cities/${trip.country._id}`);
                const citiesData = await cityRes.json();
                setCities(citiesData);

            } catch (err) {
                console.error("Failed to load trip for edit:", err);
            }
        };

        if (countries.length > 0) fetchTrip();
    }, [isEditMode, countries]);

    const saveTrip = async () => {
        const payload = {
            title: tripData.title,
            city: tripData.city,
            country: tripData.country,
            days: tripData.days,
        };

        if (id) {
            // UPDATE existing trip
            await axios.put(`http://localhost:5000/api/itinerary/${id}`, payload);
            alert("Trip updated!");
        } else {
            // CREATE new trip
            await axios.post("http://localhost:5000/api/save_itinerary", {
                userId: user.id || user._id,
                itinerary: payload
            });
            alert("Trip saved!");
        }
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


            const url = isEditMode
                ? `http://localhost:5000/api/itinerary/${location.state.itinerary._id}`
                : "http://localhost:5000/api/itinerary";

            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cityId: formData.city,
                    countryId: formData.country,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    budget: Number(formData.budget),
                    travellers: Number(formData.travellers),
                    interests: interestsArray
                })
            });

            const data = await response.json();
            navigate("/itinerary", { state: { tripData: formData } });

        } catch (err) {
            console.error("Itinerary error:", err);
        }
    };

    return (
        <>
            <div className='flex flex-col gap-4 p-14 mt-3
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
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            disabled={isEditMode}
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country._id} value={country._id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>

                        {errors.country && <p className='text-red-500 text-sm mt-1'>{errors.country}</p>}

                    </div>

                    <div>
                        <label className='text-xl text-gray-700 font-semibold mb-1'>City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={isEditMode || !formData.country}
                            className='w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                        </select>

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
                        <label className='text-xl text-gray-700 font-semibold mb-1'>Budget</label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            max={100000}
                            min={5000}
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

                    {/* <button type='submit' className='w-full border bg-[#0c4160] text-[#ccd8e4] text-extrabold text-xl py-2 rounded-md cursor-pointer'>Generate</button> */}
                    <button type='submit' className='w-full border bg-[#0c4160] text-[#ccd8e4] text-extrabold text-xl py-2 rounded-md cursor-pointer'>
                        {isEditMode ? "Update Trip" : "Generate"}


                    </button>


                </form>

            </section>
        </>
    );
}
