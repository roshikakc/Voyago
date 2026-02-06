import mongoose from "mongoose";
import { SiUniqlo } from "react-icons/si";

const destinationSchema = new mongoose.Schema({
    name:String,
    country:String,
    subtitle:String,
    overview: String,
    coordinates:{
        lat:Number,
        lng:Number,
    },
    photoUrl:String,
    attractions: [
        {
            title:String,
            desc:String,
            emoji: String
        }
    ],
    stays:[
        {
            title:String,
            desc:String,
            emoji: String
        }
    ],
    bestTime:String,
    placeId: {type: String, unique:true}
});

export default mongoose.model("Destination", destinationSchema);