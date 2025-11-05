import express from 'express';
import fetch from "node-fetch";
import Destination from '../models/destination.js';

const router = express.Router();
const cities = ["Kathmandu", "Tokyo", "Paris", "New York", "Rome", "Cairo",
    "Rio de Janeiro", "Barcelona", "Istanbul", "Sydney", "Cape Town", "Toronto"
];

//getting destination
router.get("/:name", async (req, res) => {
    const name = req.params.name;

    try {
        // getting place info from Nominatim
        const nomRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
                name
            )}&addressdetails=1&extratags=1&limit=1`,
            { headers: { "User-Agent": "voyago/1.0 (roshika.kc@aadimcollege.edu.np)" } }
        );
        const [place] = await nomRes.json();
        console.log("Nominatim response:", place);
        if (!place) return res.status(404).json({ error: "Place not found" });

        // wikipedia summary 
        let overview = "";
        let photoUrl = "";
        if (place.extratags?.wikidata || place.extratags?.wikipedia) {
            const wikiTitle =
                place.extratags.wikipedia?.split(":")[1] ||
                place.name.split(",")[0];
            const wikiRes = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`
            );
            const wikiData = await wikiRes.json();
            overview = wikiData.extract || "";
            photoUrl = wikiData.thumbnail?.source || "";
        }

        // attractions via overpass
        const overpassQuery = `
        [out:json][timeout:25];
        (
        node["tourism"](around:2000,${place.lat},${place.lon});
        );
        out body;
        `;
        const overRes = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `data=${encodeURIComponent(overpassQuery)}`,
        });

        // Check if Overpass returned JSON
        const contentType = overRes.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await overRes.text();
            console.error("Overpass returned non-JSON:", text);
            throw new Error("Overpass API failed");
        }

        const overData = await overRes.json();

        const attractions = (overData.elements || [])
            .filter((e) => e.tags?.name)
            .slice(0, 5)
            .map((e) => ({
                title: e.tags.name,
                desc: e.tags.tourism,
                img: `https://source.unsplash.com/600x400/?${encodeURIComponent(
                    e.tags.name
                )}`,


            }));

        const destination = {
            name: place.name.split(",")[0],
            country: place.address.country,
            subtitle: place.type,
            overview,
            coordinates: { lat: place.lat, lng: place.lon },
            photoUrl:
                photoUrl ||
                `https://source.unsplash.com/800x600/?${encodeURIComponent(name)}`,
            attractions,
            stays: [
                { name: "Local Guesthouse", desc: "Affordable and cozy stay." },
                { name: "Boutique Hotel", desc: "Stylish comfort downtown." },
            ],
            bestTime: "October to March",
        };


        res.json(destination);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


// //getting one destination in details page
// router.get("/:id", async (req, res) => {
//     try {
//         const destination = await Destination.findById(req.params.id);
//         if (!destination) return res.status(400).json({ error: "Not found" });
//         res.json(destination);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch destination" });
//     }
// });

export default router;
