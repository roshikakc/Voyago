import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import destinationRoute from "./routes/destinationRoutes.js";
import itineraryRouter from"./routes/itineraryRouter.js";
import countryRouter from "./routes/countryRoute.js"
import cityRoute from "./routes/cityRoute.js";
import activitiesRoute from "./routes/activitiesRoute.js";
import save_itinerary from "./routes/historyRoute.js";
import user_itineraries from "./routes/userItineraryRoute.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//mongodb connection
connectDB();

// route 
app.use("/api/auth", authRoute);
app.use("/api/destination", destinationRoute);
app.use("/api/itinerary", itineraryRouter);
app.use("/api/countries", countryRouter );
app.use("/api/cities", cityRoute);
app.use("/api/activities",activitiesRoute);
app.use("/api/save_itinerary",save_itinerary);
app.use("/api/user_itineraries", user_itineraries);


app.listen(5000, () => console.log("Server running on  http://localhost:5000"));