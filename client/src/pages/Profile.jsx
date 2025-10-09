import React, { useState } from "react";

function Profile() {
  // Example user info
  const [user] = useState({
    name: "Rosh",
    email: "rosh@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  });

  // Example itineraries
  const [itineraries] = useState([
    {
      id: 1,
      title: "Nepal Adventure",
      days: [
        {
          day: 1,
          activities: ["Arrive Kathmandu, check-in hotel"],
          notes: "Wear comfortable shoes",
        },
        {
          day: 2,
          activities: ["Sightseeing Boudhanath", "Visit Pashupatinath"],
          notes: "",
        },
      ],
    },
    {
      id: 2,
      title: "Beach Getaway",
      days: [
        { day: 1, activities: ["Check-in resort", "Relax on the beach"], notes: "" },
        { day: 2, activities: ["Snorkeling", "Boat tour"], notes: "" },
      ],
    },
  ]);

  // Track which itinerary is expanded
  const [expandedId, setExpandedId] = useState(null);

  const toggleItinerary = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {/* Profile Section */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md mb-8">
        <img
          src={user.avatar}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-700">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Itinerary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={() => toggleItinerary(itinerary.id)}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {itinerary.title}
            </h2>
            <p className="text-gray-500 mb-4">
              Duration: {itinerary.days.length} days
            </p>

            {/* Expanded Itinerary */}
            {expandedId === itinerary.id && (
              <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">
                {itinerary.days.map((day) => (
                  <div key={day.day} className="bg-gray-50 p-3 rounded-md">
                    <h3 className="font-semibold text-gray-600 mb-1">
                      Day {day.day}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {day.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                    {day.notes && (
                      <p className="text-sm text-gray-500 mt-1">
                        Notes: {day.notes}
                      </p>
                    )}
                  </div>
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
