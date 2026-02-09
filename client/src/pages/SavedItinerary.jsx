import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ItineraryView from "../components/ItineraryView";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom";


function SavedItinerary() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    // const isEditMode = !!id || location.state?.editTrip;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/itinerary/${id}`)
            .then(res => setData(res.data))
            .catch(() => alert("Failed to load itinerary"))
            .finally(() => setLoading(false));
    }, [id]);


    //edit
    const handleEdit = (trip) => {
        // navigate(`/plan/${trip._id}`, { state: { editTrip: true } });", {
        //     state: {
        //         editTrip: true,
        //         itinerary: data
        //     }
        // });
        navigate(`/plan/${trip._id}`, { state: { editTrip: true, itinerary: trip } });
        console.log(trip._id);

    };

    //delete
    const handleDelete = async () => {
        if (!window.confirm("Delete this trip permanently?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/itinerary/${id}`);
            alert("Trip deleted!");
            navigate("/profile");

        } catch {
            alert("Failed to delete trip");
        }
    }

    
    if (loading) return <p>Loading...</p>;

    return (
            <ItineraryView data={data} 
            actions ={
                <>
            {/* buttons */}
          
                <button
                    onClick={() => handleEdit(data)}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Edit Trip
                </button>

                <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Delete Trip
                </button>
                </>
            }
            />
    );
}

export default SavedItinerary;
