import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Itinerary() {
  // const {city} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);


  useEffect(() => {
    if (!data) {
      setLoading(true);
    }
  }, [data]);


  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!data || !data.days || data.days.length === 0) {
    return (
      <div className="text-center mt-20 text-red-500">
        No itinerary data found. Please plan a trip first.
      </div>
    );
  }


  return (
    <section className="max-w-4xl mx-auto bg-white p-10 mt-10 rounded-3xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Your Trip Itinerary</h2>
      < div className="space-y-8">
        {data.days.map((day, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-600 mb-3">
              Day {index + 1} -{day.date}
            </h3>

            {/* city */}
            {day.city && (
              <p className="text-md font-medium text-gray-600 mt-2">
                {day.city}
              </p>
            )}

            {/* activities  */}
            <ul className="space-y-2">
              {day.activities.length === 0 ? (
                <li className="text-gray-400 italic">
                  No activities planned for this day
                </li>
              ) : (

                day.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="flex justify-between bg-white p-3 rounded-md border">
                    {activity.name}  • Rs.{activity.cost}

                  </li>
                ))
              )
              }
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/plan")}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Plan Another Trip
        </button>
      </div>

    </section>
  );
}

export default Itinerary;
