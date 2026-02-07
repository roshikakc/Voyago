import express from "express";
import Activity from "../models/activity.js";

const router = express.Router();


router.get("/:cityId", async (req, res) => {
   try {
    const { cityId } = req.params;
    const activities = await Activity.find({ city: cityId });
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
