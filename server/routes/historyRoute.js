import express from "express";
import Itinerary from "../models/itinerary.js";
import userHistory from "../models/userHistory.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Save request body:", req.body);

  const { userId, itinerary } = req.body;

  if (!userId || !itinerary || !itinerary.days) {
    return res.status(400).json({ error: "Missing userId or itinerary.days" });
  }

  if (!itinerary.country) {
    return res.status(400).json({ error: "Country is required" });
  }

  try {
    const saved = await Itinerary.create({
      title: itinerary.title || "My Trip",
      city: new mongoose.Types.ObjectId(itinerary.city),
      country: new mongoose.Types.ObjectId(itinerary.country),
      days: itinerary.days,
      user_id: userId
    });

    await userHistory.create({
      user_id: userId,
      itinerary_id: saved._id
    });

    return res.json({ success: true, saved });

  } catch (err) {
    console.error("Mongo save error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
