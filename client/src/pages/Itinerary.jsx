import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useParams } from "react-router-dom";
import ItineraryView from "../components/ItineraryView";


function Itinerary() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const isEditMode = Boolean(id);


  const [tripData, setTripData] = useState(
    location.state?.tripData || {
      country: "",
      city: "",
      startDate: "",
      endDate: "",
      budget: "",
      travellers: "",
      interests: "",
    }
  );

  const [data, setData] = useState(location.state?.itinerary || null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/countries");
        setCountries(res.data);
      } catch (err) {
        console.error("Failed to load countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch itinerary from backend
  useEffect(() => {
    const fetchNewItinerary = async () => {
      const { city, startDate, endDate, budget, travellers, country } = tripData;
      if (!city || !country || !startDate || !endDate || !budget || !travellers) return;

      setLoading(true);
      setError("");

      try {
        const payload = {
          cityId: city,
          countryId: country,
          startDate,
          endDate,
          budget: Number(budget),
          travellers: Number(travellers),
          interests: tripData.interests
            ? tripData.interests.split(",").map(i => i.trim())
            : [],
        };

        console.log("Generating new itinerary with:", payload);

        const response = await axios.post("http://localhost:5000/api/itinerary", payload);


        if (response.data.success) {
          setData(response.data.itinerary); // <-- use .itinerary
        } else {
          setError(response.data.error || "Failed to generate itinerary.");
        }


        console.log("Backend response:", response.data);


      } catch (err) {
        console.error("Error generating itinerary:", err.response?.data || err);
        setError(err.response?.data?.error || "Failed to generate itinerary.");
      } finally {
        setLoading(false);
      }
    };

    // Trigger new itinerary generation if tripData comes from navigation state
    if (location.state?.tripData) {
      fetchNewItinerary();
    }
  }, [location.state, tripData]);



  // Fetch trip and cities if editing
  useEffect(() => {
    const fetchTrip = async () => {
      if (!isEditMode || countries.length === 0) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/itinerary/${id}`);
        const trip = res.data;

        setTripData({
          country: trip.country?._id || "",
          city: trip.city?._id || "",
          startDate: trip.startDate || "",
          endDate: trip.endDate || "",
          budget: trip.budget || "",
          travellers: trip.travellers || "",
          interests: (trip.interests || []).join(", "),
        });

        setData(trip);
        // Load cities for this country
        if (trip.country?._id) {
          const cityRes = await axios.get(`http://localhost:5000/api/cities/${trip.country._id}`);
          setCities(cityRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch trip:", err);
      }
    };

    fetchTrip();
  }, [isEditMode, id, countries]);


  //   const fetchNewItinerary = async () => {
  //     const { city, startDate, endDate, budget, travellers } = tripData;
  //     if (!city || !startDate || !endDate || !budget || !travellers) return;

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const payload = {
  //         cityId: city,
  //         startDate,
  //         endDate,
  //         budget: Number(budget),
  //         travellers: Number(travellers),
  //         interests: tripData.interests
  //           ? tripData.interests.split(",").map(i => i.trim())
  //           : [],
  //       };

  //       const response = await axios.post("http://localhost:5000/api/itinerary", payload);

  //       if (response.data.success) {
  //         setData(response.data);
  //       } else {
  //         setError(response.data.error || "Failed to generate itinerary.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching itinerary:", err.response?.data || err);
  //       setError(err.response?.data?.error || "Failed to generate itinerary.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (location.state?.tripData) {
  //     fetchNewItinerary();
  //   } else if (id) {
  //     fetchSavedItinerary();
  //   }
  // }, [id, location.state, tripData]);

console.log("URL Param ID:", id);

  console.log("tripData at save:", tripData);
console.log("Edit mode ID:", id);

  // Save itinerary for logged-in users
  const saveItinerary = async () => {
    if (!user) {
      alert("Please login to save itinerary");
      return;
    }

    if (!data || !data.days) {
      alert("No itinerary data to save");
      return;
    }

    if (!tripData.country) {
      alert("Please select a country before saving the itinerary.");
      return;
    }

    try {
      const payload = {
        title: "My Trip",
        city: tripData.city,
        country: tripData.country,
        days: data.days
      };

      console.log("Saving itinerary:", payload);

      if (id) {
        // EDIT MODE → UPDATE
        await axios.put(`http://localhost:5000/api/itinerary/${id}`, {
          title: "My Trip",
          city: tripData.city,
          country: tripData.country,
          days: data.days
        });
        alert("Trip updated!");
      } else {
        // NEW MODE → CREATE
        await axios.post("http://localhost:5000/api/save_itinerary", {
          userId: user.id || user._id,
          itinerary: {
            title: "My Trip",
            city: tripData.city,
            country: tripData.country,
            days: data.days
          }
        });
        alert("Trip saved!");
      }


    } catch (err) {
      console.error("Save error:", err.response?.data || err);
      alert(err.response?.data?.error || "Failed to save itinerary");
    }

  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
        <div className="mt-4">
          <button
            onClick={() => navigate("/plan")}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Plan a new Trip
          </button>


        </div>
      </div>
    );
  }

  return (
    <ItineraryView
      data={data}
      onSave={saveItinerary}
    />
  );
}
// <div className="flex justify-center gap-4 mt-10">
//   <button
//     onClick={saveItinerary}
//     className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 "
//   >
//     Save Itinerary
//   </button>

//   <button
//     onClick={() => navigate("/plan")}
//     className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//   >
//     Plan Another Trip
//   </button>
// </div>


export default Itinerary;
