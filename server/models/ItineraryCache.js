import mongoose from "mongoose";

const ItineraryCacheSchema = new mongoose.Schema({
  city: { type: String, unique: true },
  data: Object,
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("ItineraryCache", ItineraryCacheSchema);
