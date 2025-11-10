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
    if (!id) return;
    axios
      .get(`http://localhost:5000/api/destination/id/${id}`)
      .then((res) => setDestination(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!destination) return <p className="text-center mt-12">Loading...</p>;

  return (
    <section className="max-w-5xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">{destination.name}</h1>

    <DestinationDetails 
    image={destination.photoUrl}
    // title={destination.name}
    // subtitle={destination.subtitle}
    overview={destination.overview}
    attractions={destination.attractions}
    stays={destination.stays}
    bestTime={destination.bestTime}
    />
     
    </section>
  );
}
