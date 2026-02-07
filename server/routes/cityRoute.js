import express from "express";
import City from "../models/city.js";

const router = express.Router();

router.get("/:countryId", async (req, res) => {
  try {
    const { countryId } = req.params;
    const cities = await City.find({ country: countryId });
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
