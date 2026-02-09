import mongoose from "mongoose";


const userHistorySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    itinerary_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
    created_at: { type: Date, default: Date.now },
   

});

export default mongoose.model("userHistory", userHistorySchema);