import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";

function Profile() {
  const { user, loading } = useAuth();
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">No user data</p>;

  const itineraries = [
    {
      id: 1,
      title: "Nepal Adventure",
      days: [
        { day: 1, activities: ["Arrive Kathmandu"], notes: "" },
        { day: 2, activities: ["Visit Pashupatinath"], notes: "" },
      ],
    },
  ];

  const toggleItinerary = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white p-6 rounded-2xl shadow-md cursor-pointer"
            onClick={() => toggleItinerary(itinerary.id)}
          >
            <h2 className="text-xl font-semibold">{itinerary.title}</h2>

            {expandedId === itinerary.id && (
              <div className="mt-4">
                {itinerary.days.map((day) => (
                  <p key={day.day}>Day {day.day}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
