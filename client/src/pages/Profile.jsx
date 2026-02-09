import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { user, loading } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/user_itineraries/${user._id}`)
        .then((res) => setItineraries(res.data))
        .catch((err) => {
          if (err.response?.status === 404) {
            setItineraries([]); // user has no saved trips
          } else {
            console.error("Fetch error:", err.response?.data || err);
          }
        });
    }
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">No user data</p>;


  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {/* Profile */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}`}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-700">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Itineraries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {itineraries.length === 0 && (
          <p className="text-gray-500">No saved itineraries yet</p>
        )}



        {itineraries
          .filter(item => item.itinerary_id)
          .map(item => {
            const trip = item.itinerary_id;
            return (
              <div key={trip._id} onClick={() => navigate(`/saved-itinerary/${trip._id}`)}>
                <h2>{trip.title || "My Trip"}</h2>
                <div>
                  <p>{trip.city?.name || "Unknown City"}</p>
                  <p>{trip.city?.country || "Unknown Country"}</p>
                </div>
              </div>
            );
          })}



      </div>
    </div>
  );
}

export default Profile;
