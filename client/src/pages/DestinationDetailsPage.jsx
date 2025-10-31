import React from 'react'
import { Link } from 'react-router-dom';
import t1 from './../assets/image/t1.png';
import { DestinationDetails } from '../components/destination-details';


export default function DestinationDetailsPage() {
    return (
        <DestinationDetails
            image={t1} title="Bali, Indonesia"
            subtitle=" Explore the Island of the Gods — where lush jungles, beaches, and temples meet."
            overview="Bali is a tropical paradise known for its forested volcanic mountains, iconic rice paddies,
            beaches, and coral reefs. The island is home to religious sites such as the cliffside Uluwatu Temple
               and offers world-class surfing, diving, and cultural experiences."
            attractions={[
                {
                    title: "Uluwatu Temple",
                    img: "https://images.unsplash.com/photo-1601918774946-2587a7a1a1b1",
                },
                {
                    title: "Tegallalang Rice Terrace",
                    img: "https://images.unsplash.com/photo-1549887534-4c1a8d3dd8b3",
                },
                {
                    title: "Mount Batur",
                    img: "https://images.unsplash.com/photo-1534297635766-a262cdcb96f5",
                },
            ]}
            stays={[
                { name: "Luxury — Four Seasons Resort Bali", desc: "Experience unmatched luxury amidst tropical gardens." },
                { name: "Mid-range — Ubud Village Resort", desc: "Perfect blend of comfort and nature." },
                { name: "Budget — The Farm Hostel", desc: "A cozy and affordable stay near Canggu beaches." },
            ]}

            bestTime=" The best time to visit Bali is during the **dry season (April to October)**, when the weather is
         sunny and ideal for beaches and outdoor adventures. Avoid the wet season (November to March) for a
        smoother travel experience."
        />
    );

};

