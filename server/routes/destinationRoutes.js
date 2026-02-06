import express from 'express';
import fetch from "node-fetch";
import Destination from '../models/destination.js';
import {
    getBestImage,
    getBestHotelImage
} from "../utils/imageFetcher.js";


const emojiMap = {
    attraction: "📍",
    museum: "🏛️",
    theme_park: "🎡",
    viewpoint: "🌄",
    zoo: "🦁",
    gallery: "🖼️",
    monument: "🗿",
    castle: "🏰",
    park: "🌳",
    garden: "🌺",
    beach: "🏖️",
    hotel: "🏨",
    guest_house: "🏡",
    hostel: "🛏️",
    motel: "🚗",
    resort: "🌴"

};

const router = express.Router();

//get all destinations
router.get("/", async (req, res) => {
    try {
        console.log("Received query:", req.query);
        const { names } = req.query;

        //by names for homepage
        if (names) {
            const nameArray = names.split(",").map(n => decodeURIComponent(n.trim()));

            const destinations = await Destination.find({
                name: { $in: nameArray }
            });
            return res.json(destinations);
        }

        //for returning all destinations
        const allDestinations = await Destination.find();
        res.json(allDestinations);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});


//getting destination by id
router.get("/id/:id", async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }
        res.json(destination);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch destination" });
    }
});

//getting destination by name

router.get("/:name", async (req, res) => {

    try {
        const name = decodeURIComponent(req.params.name);
        const forceRefresh = req.query.refresh === 'true';

        let destination = await Destination.findOne({
            name: new RegExp(`^${name}$`, "i")
        });

        console.log("Destination found? ", !!destination, "Force refresh?", forceRefresh);
        if (destination && !forceRefresh) {
            console.log(`Found "${name}" in MongoDB`);
            let updated = false;

            // Fix main photo
            if (destination.photoUrl && destination.photoUrl.includes("source.unsplash.com")) {
                console.log(`Fixing main image for: ${destination.name}`);
                destination.photoUrl = await getBestImage(destination.name);
                updated = true;
            }

            // Fix attractions
            destination.attractions = await Promise.all(
                destination.attractions.map(async (a) => {
                    if (a.img && a.img.includes("source.unsplash.com")) {
                        console.log("Fixing attraction image:", a.title);
                        a.img = await getBestImage(a.title);
                        updated = true;
                    }
                    return a;
                })
            );

            // Fix stays
            destination.stays = await Promise.all(
                destination.stays.map(async (s) => {
                    if (s.img && s.img.includes("source.unsplash.com")) {
                        console.log("Fixing stay image:", s.title);
                        s.img = await getBestHotelImage(s.title);
                        updated = true;
                    }
                    return s;
                })
            );

            // Save only if something changed
            if (updated) {
                console.log("Saving updated image URLs to MongoDB...");
                destination.markModified("attractions");
                destination.markModified("stays");


                await destination.save().catch(err => console.error("SAVE ERROR:", err));
            }
            return res.json(destination);
        }

        console.log(`Fetching "${name}" from APIs....`);

        // getting place info from Nominatim
        const nomRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
                name
            )}&addressdetails=1&extratags=1&limit=1&accept-language=en`,
            { headers: { "User-Agent": "voyago/1.0 (roshika.kc@aadimcollege.edu.np)" } }
        );
        const [place] = await nomRes.json();
        console.log("Nominatim response:", place);
        if (!place) return res.status(404).json({ error: "Place not found" });

        // check by placeId
        // destination = await Destination.findOne({ placeId: place.place_id.toString() });
        // if (destination) {
        //     console.log(`Found existing "${name}" by placeId`);
        //     return res.json(destination);
        // }


        // check by placeId
        destination = await Destination.findOne({ placeId: place.place_id.toString() });

        if (destination && !req.query.refresh) {
            console.log(`Found existing "${name}" by placeId`);
            return res.json(destination);
        }

        // If ?refresh=true, delete and refetch
        if (destination && req.query.refresh) {
            console.log(` Refreshing existing destination "${name}"`);
            await Destination.deleteOne({ placeId: place.place_id.toString() });
        }



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

        const englishName =
            place.extratags?.["name:en"] ||
            place.display_name?.split(",")[0] ||
            place.name;

        const mainPhoto = await getBestImage(englishName);

        // attractions via overpass
        const overpassQuery = `
        [out:json][timeout:25];
        (
        node["tourism"](around:10000,${place.lat},${place.lon});
        way["tourism"](around:10000,${place.lat},${place.lon});
        relation["tourism"](around:10000,${place.lat},${place.lon});

        );
        out body;
        `;

        let overData = { elements: [] };
        try {
            const overRes = await fetch("https://overpass-api.de/api/interpreter", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `data=${encodeURIComponent(overpassQuery)}`,
            });


            // Check if Overpass returned JSON
            const contentType = overRes.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await overRes.text();
                console.error("Overpass returned non-JSON:", text.slice(0, 200));
            } else {
                overData = await overRes.json();
            }
        } catch (e) {
            console.warn("Overpass fetch failed:", e.message);
        }

        // const overData = await overRes.json();

        console.log(
            "Overpass returned:",
            overData.elements
                .filter((e) => ["hotel", "guest_house", "motel", "hostel", "resort"].includes(e.tags?.tourism))
                .map((e) => e.tags)
        );



        const allTourism = (overData.elements || []).filter((e) => e.tags?.name);

        const attractions = allTourism
            .filter((e) => [
                "attraction",
                "museum",
                "theme_park",
                "viewpoint",
                "zoo",
                "gallery",
                "monument",
                "castle",
                "park",
                "garden",
                "beach",
            ].includes(e.tags?.tourism)
            )
            .filter(e => e.tags["name:en"] || e.tags.name)
            .slice(0, 6)

        const attraction = await Promise.all(
            attractions.map(async (e) => {
                const englishName = e.tags["name:en"] || e.tags.name;
                
                const type = e.tags.tourism;
                const emoji = emojiMap[type] || "📌";
                return {
                    title: englishName,
                    type,
                    emoji,
                 
                };
            })
        );

        const stays = allTourism
            .filter((e) => ["hotel", "guest_house", "motel", "hostel", "resort"].includes(e.tags.tourism))
            .filter(e => e.tags["name:en"] || e.tags.name)
            .slice(0, 6);

        const stay = await Promise.all(
            stays.map(async (e) => {
                const englishName = (e.tags["name:en"] || e.tags.name || "")
                    .replace(/[^\x00-\x7F]/g, "");

                const type = e.tags.tourism;
                const emoji = emojiMap[type] || "🏨";
                return {
                    title: englishName || "Unamed Stay",
                    type,
                    emoji,
                   
                };
            })
        );


        const newDestination = new Destination({
            name: englishName,
            country: place.address.country,
            subtitle: place.type,
            overview,
            coordinates: { lat: place.lat, lng: place.lon },
            photoUrl: mainPhoto,
            attractions: attraction,
            stays: stay,
            bestTime: "October to March",
            placeId: place.place_id?.toString() || "",

        });



        await newDestination.save();
        console.log(`Saved "${name}" to MongoDB`);

        const count = await Destination.countDocuments();
        console.log(`Total destinations in DB now: ${count}`);

        const latest = await Destination.find().sort({ _id: -1 }).limit(1);
        console.log("Most recently saved document:", latest[0]);

        res.json(newDestination);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


// //getting one destination from MongoDb
// router.get("/", async (req, res) => {
//     try {
//         const destination = await Destination.find();
//         res.json(destination);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch destination" });
//     }
// });

export default router;
