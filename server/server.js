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


app.listen(5000, () => console.log("Server running on  http://localhost:5000"));