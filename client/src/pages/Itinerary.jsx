import React, { useState } from "react";

function Itinerary() {
  const [itinerary, setItinerary] = useState([
    { day: 1, activities: [""], notes: "" },
  ]);

  // Add a new day
  const addDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, activities: [""], notes: "" },
    ]);
  };

  // Remove a day
  const removeDay = (index) => {
    const updated = itinerary.filter((_, i) => i !== index);
    // Renumber days
    setItinerary(updated.map((item, i) => ({ ...item, day: i + 1 })));
  };

  // Add an activity to a specific day
  const addActivity = (dayIndex) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push("");
    setItinerary(updated);
  };

  // Remove an activity from a day
  const removeActivity = (dayIndex, actIndex) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.splice(actIndex, 1);
    setItinerary(updated);
  };

  // Handle text change for an activity
  const handleActivityChange = (dayIndex, actIndex, value) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[actIndex] = value;
    setItinerary(updated);
  };


  return (
    <section className="max-w-4xl mx-auto bg-white p-10 mt-10 rounded-3xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Itinerary</h2>
        <button
          type="button"
          onClick={addDay}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          + Add Day
        </button>
      </div>

      <div className="space-y-8">
        {itinerary.map((day, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">
                Day {day.day}
              </h3>
              {itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDay(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Activities List */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Activities
              </label>

              {day.activities.map((activity, actIndex) => (
                <div
                  key={actIndex}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) =>
                      handleActivityChange(index, actIndex, e.target.value)
                    }
                    placeholder={`Activity ${actIndex + 1}`}
                    className="w-full bg-white border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  />
                  {day.activities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeActivity(index, actIndex)}
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addActivity(index)}
                className="text-blue-600 text-sm hover:underline mt-1"
              >
                + Add Activity
              </button>
            </div>

            
          </div>
        ))}
      </div>
    </section>
  );
}

export default Itinerary;
