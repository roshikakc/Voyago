import mongoose from "mongoose";


const userHistorySchema = new mongoose.Schema({
    user_id: { type: String, require: true },
    itinerary_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
    algorithm_used: { type: String, enum: ['rule-based', 'content-based', 'knapsack', 'greedy'] },
    created_at: { type: Date, default: Date.now },
    last_viewed: { type: Date, default: Date.now }

});