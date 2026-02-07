import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {type: String, required: true},
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true }
});
export default mongoose.model("City", citySchema);
