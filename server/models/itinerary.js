import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  title: { type: String, default: "My Trip" },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  days: [
    {
      date: String,
      city: { type: String },
      activities: [
        {
          name: String,
          cost: Number,
        },
      ],
    },
  ],
 
});

export default mongoose.model("Itinerary", itinerarySchema);
