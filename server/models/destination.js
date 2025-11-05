import mongoose from "mongoose";

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
            img:String,
        }
    ],
    stays:[
        {
            name:String,
            desc:String,
        }
    ],
    bestTime:String,
    placeId:String,
});

export default mongoose.model("Destination", destinationSchema);