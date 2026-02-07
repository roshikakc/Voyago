import express from "express";
import Country from "../models/country.js";

const router = express.Router();

router.get("/", async (req, res) => {
try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;