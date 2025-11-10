import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Destination from '../models/destination.js';



const cities = ["Pattaya city", "Kathmandu", "Kyoto", "Barcelona", "Istanbul", "Paris", 
    "Cape Town", "New York City", "Rome", "Prague", "Marrakesh", "Oslo"];

    


const run = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/voyago");
        console.log("Connects to MongoDB");

        const forceRefresh = true;

        for (const name of cities) {
            const exists = await Destination.findOne({ name });
            if (exists && !forceRefresh) {
                console.log(`skipping ${name} (already exists)`);
                continue;
            }

            console.log(`Fetching ${name}...`);
            const res = await fetch(`http://localhost:5000/api/destination/${encodeURIComponent(name)}?refresh=true`);


            if (!res.ok) {
                console.log(`Failed ${name}: ${res.status} ${res.statusText}`);
                continue;
            }

            const data = await res.json();
            console.log(`Seeded ${data.name || name}`);
        }

        console.log("Seeding complete");
    } catch (err) {
        console.log("seeding failed:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
};

run();