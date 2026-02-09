function ItineraryView({ data, onSave, actions }) {
  return (
    <section className="max-w-4xl mx-auto bg-white p-10 mt-10 rounded-3xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Your Trip Itinerary</h2>

      <div className="space-y-8 mt-6">
        {data?.days?.length > 0 ? (
          data.days.map((day, index) => (
            <div key={index} className="border rounded-xl p-6 bg-gray-50">
              <h3 className="text-lg font-semibold mb-3">
                Day {index + 1} - {day.date}
              </h3>

              <ul className="space-y-2">
                {day.activities.length === 0 ? (
                  <li className="italic text-gray-400">No activities planned</li>
                ) : (
                  day.activities.map((activity, i) => (
                    <li key={i} className="flex justify-between bg-white p-3 rounded-md border">
                      {activity.name} • Rs.{activity.cost}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No itinerary data available.
          </p>
        )}
      </div>

{/* buttons */}
      <div className="flex justify-center gap-4 mt-10">
        {onSave && (
          <button
            onClick={onSave}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save Itinerary
          </button>
          
        )}

        {actions && actions}
        <button
          onClick={() => navigate("/plan")}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Plan a new Trip
        </button>
      </div>
    </section>
  );
}

export default ItineraryView;
