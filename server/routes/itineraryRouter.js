import express from "express";
import city from "../models/city.js";
import activity from "../models/activity.js";
import { applyFiltering } from "../utils/filtering.js";
import { estimateActivities } from "../utils/estimator.js";
import { knapsackSelect } from "../utils/knapsack.js";
import { splitIntoDays } from "../utils/greedy.js";
import Itinerary from "../models/itinerary.js";
import mongoose from "mongoose";


const router = express.Router();


router.post("/", async (req, res) => {
    try {
        console.log("Received body:", req.body);

        const { cityId, countryId, startDate, endDate, budget, travellers, interests = [] } = req.body;

        // Validate input
        if (!cityId || !countryId || !startDate || !endDate || !budget || !travellers) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        // Find city
        const cityDoc = await city.findById(cityId);
        if (!cityDoc) {
            return res.status(404).json({ error: "City not found" });
        }

        // Fetch activities for city
        const activities = await activity.find({ city: cityDoc._id }).lean();
        console.log("Activities from DB:", activities);
        // console.log("Activities found:", activities.length);

        if (!activities.length) {
            return res.status(404).json({ error: "No activities found for this city" });
        }

        // Normalize interests
        const interestList = interests.map(i => i.toLowerCase().trim());

        // Apply filters
        const scored = applyFiltering(activities, interestList);


        // Estimate cost/time
        const estimated = estimateActivities(scored);
        // console.log("Activities after estimation:", estimated);


        // Budget logic
        const totalBudget = Number(budget) * Number(travellers);

        // Select best activities
        const selected = knapsackSelect(estimated, totalBudget);

        // Split across days
        const itineraryDays = splitIntoDays(selected, startDate, endDate);

        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        // Return success
        // return res.json({
        //     success: true,
        //     meta: {
        //         city: cityDoc.name,
        //         totalDays,
        //         travellers,
        //         budget: totalBudget
        //     },
        //     days: itineraryDays
        // });

        // SAVE itinerary to DB
        const newItinerary = new Itinerary({
            city: new mongoose.Types.ObjectId(cityId),
            country: new mongoose.Types.ObjectId(countryId),
            title: "My Trip",
            days: itineraryDays
        });

        await newItinerary.save();

        return res.json({
            success: true,
            itinerary: newItinerary,  // send back saved doc with _id
        });

    } catch (err) {
        console.error("Itinerary Error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }



});

// GET itinerary by ID
router.get("/:id", async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id)
            .populate({ path: "city" })
            .populate({ path: "country", strictPopulate: false });
        if (!itinerary) return res.status(404).json({ error: "Itinerary not found" });
        res.json(itinerary);
    } catch (err) {
        console.error("Fetch itinerary error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Itinerary.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Itinerary.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        city: req.body.city,
        country: req.body.country,
        days: req.body.days
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Trip not found" });

    res.json({ success: true, updated });

  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});



export default router;
