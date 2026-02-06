import express from "express";
import { fetchPOIsGeoapify } from "../utils/fetchGeoapify.js";
import { parseCities } from "../utils/helpers.js";
import { applyFiltering } from "../utils/filtering.js";
import { estimateActivities } from "../utils/estimator.js";
import { knapsackSelect } from "../utils/knapsack.js";
import { splitIntoDays } from "../utils/greedy.js";
import { kathmanduActivities } from "../utils/kathmanduActivities.js";



const router = express.Router();
const USE_STATIC_DATA = true; //  set false when done testing

router.post("/", async (req, res) => {
    console.log("Itinerary request:", req.body);

    const {
        city,
        startDate,
        endDate,
        budget,
        travellers,
        interests = []
    } = req.body;


    const interestList = Array.isArray(interests)
        ? interests.map(i => i.toLowerCase().trim()).filter(Boolean)
        : String(interests)
            .split(",")
            .map(i => i.trim().toLowerCase())
            .filter(Boolean);

    if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
        return res.status(400).json({
            success: false,
            error: "Invalid startDate or endDate. Use YYYY-MM-DD format."
        });
    }


    if (USE_STATIC_DATA) {
        const scored = applyFiltering(kathmanduActivities, interestList);
        const estimated = estimateActivities(scored);

        const totalDays =
            Math.ceil(
                (new Date(endDate) - new Date(startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        const maxHours = totalDays * 8;

        const selected = knapsackSelect(
            estimated,
            Number(budget),
            maxHours
        );

        const days = splitIntoDays(selected, startDate, endDate);

        return res.json({
            success: true,
            meta: {
                mode: "STATIC_TEST",
                city,
                travellers,
                budget
            },
            days
        });
    }

    console.log("Itinerary request:", req.body);
    function generateEmptyDays(totalDays) {
        const days = [];
        for (let i = 1; i <= totalDays; i++) {
            days.push({
                day: i,
                activities: [],
            });
        }
        return days;
    }

    try {
        const { country, city, startDate, endDate, budget, travellers, interests } = req.body;
        if (!city || !startDate || !endDate || !budget) {
            return res.status(400).json({ error: "city, startDate, endDate and budget are required" });
        }

        const cityList = parseCities(city);
        const numTravellers = Math.max(1, Number(travellers) || 1);
        const totalBudget = Number(budget) * numTravellers || 0;


        //fetch POIS
        //fetch POIs
let allPOIs = [];
for (const c of cityList) {
    let lat, lon;
    // simple lookup for demo
    if (c.toLowerCase() === "kathmandu") {
        lat = 27.7172;
        lon = 85.3240;
    } else {
        console.warn(`No coordinates for ${c}, using default 0,0`);
        lat = 0;
        lon = 0;
    }

    const pois = await fetchPOIsGeoapify(lat, lon, interestList);
    allPOIs.push(...pois.map(p => ({ ...p, city: c })));
}

console.log("All POIs:", allPOIs.length);

//estimate cost and duration
let estimated = estimateActivities(allPOIs); 



        //estimate cost and duration
        // let estimated = estimateActivities(allPOIs);
        // estimated = estimated.map(a => ({ ...a, cost: Math.round((a.cost || 0) * numTravellers) }));

        // console.log("After estimation:", estimated.length);

        // normalize data before knapsack
        // if (!estimated || estimated.length === 0) {
        //     return res.json({
        //         success: true,
        //         meta: {
        //             message: "No activities found, showing free exploration days"
        //         },
        //         days: generateEmptyDays(startDate, endDate)
        //     });
        // }
        function generateEmptyDays(startDate, endDate) {
            const s = new Date(startDate);
            const e = new Date(endDate);
            const totalDays = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;

            return Array.from({ length: totalDays }, (_, i) => ({
                day: i + 1,
                activities: []
            }));
        }


        estimated = estimated.map(a => ({
            ...a,
            duration: a.duration && a.duration > 0 ? a.duration : 1,
            cost: Math.max(0, a.cost || 0)
        }));

        console.log("Normalized estimated sample:", estimated.slice(0, 3));


        //compute trip days and max hours
        const s = new Date(startDate);
        const e = new Date(endDate);
        const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
        const maxHours = days * 8;

        //select activity in budget and time
        const selected = knapsackSelect(estimated, totalBudget, maxHours);
        const safeSelected = selected.length ? selected : estimated.slice(0, 6);

        console.log("After knapsack:", safeSelected.length);

        //allocate day by day greedy
        const allocated = splitIntoDays(safeSelected, startDate, endDate);

        return res.json({
            success: true,
            meta: { cities: cityList, days, travellers: numTravellers, budget: totalBudget },
            days: allocated
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
