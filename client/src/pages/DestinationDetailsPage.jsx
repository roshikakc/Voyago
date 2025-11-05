import { Link } from 'react-router-dom';
import t1 from './../assets/image/t1.png';
import { DestinationDetails } from '../components/destination-details';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DestinationDetailsPage() {      
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/destinations/${id}`)
      .then((res) => setDestination(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!destination) return <p className="text-center mt-12">Loading...</p>;

  return (
    <section className="max-w-5xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">{destination.name}</h1>
      <p className="text-gray-600 mb-6">{destination.overview}</p>
      <img
        src={destination.photoUrl}
        alt={destination.name}
        className="w-full h-96 object-cover rounded-2xl mb-8"
      />

      <h2 className="text-2xl font-semibold mb-4">Top Attractions</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {destination.attractions?.map((a, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-4 shadow-sm">
            <img
              src={a.img}
              alt={a.title}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="font-bold text-lg">{a.title}</h3>
            <p className="text-gray-500 text-sm">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
