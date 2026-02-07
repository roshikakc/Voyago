import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: {type: String, required: true},
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  tags: [String]
});
export default mongoose.model("Activity", activitySchema);
