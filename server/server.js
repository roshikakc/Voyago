import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import {requireAuth} from "@clerk/clerk-sdk-node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mongoUri = "mongodb://127.0.0.1:27017/voyago";

mongoose.connect(mongoUri).then (() => {
    console.log("Connected to mongodb");
}).catch(err => {
    console.log("Mongodb connection error:",err);
})

app.listen(PORT, () => {
    console.log("Server running on the port 3000")
})
