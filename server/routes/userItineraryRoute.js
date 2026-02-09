import express from "express";
import userHistory from "../models/userHistory.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const history = await userHistory.find({ user_id: req.params.userId })
      .populate({
        path: "itinerary_id",
        populate: { path: "city" }  // ensures city.name & city.country
      });

    if (!history || history.length === 0) {
      return res.json([]); // return empty array instead of 404
    }

    res.json(history);
  } catch (err) {
    console.error("Fetch user itineraries error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
