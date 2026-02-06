import mongoose from "mongoose";


const itinerarySchema = new mongoose.Schema(
    {
        user_id: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        destination: {
            type: String,
            required:true,
        },

        startDate: {
            type: Date,
            required:true,
        },
        endDate: {
            type: Date,
            required:true,
        },

        numberofDays: {
            type: number, 
        },


        preferences: {
            budget: {
                min:Number,
                max: Number
            },
            interest: String,
            numofTravelers: Number,
        },


        itineraryDays: [
            {
                day: Number,
                activities: [
                    {
                        name: String,
                        location: String,
                        description: String,
                        estimatedCost: Number,
                        startTime: String,
                        endTime: String,
                    },
                ],
            },
        ],

        // candidateActivities: [
        //     {
        //         name: String,
        //         location: String,
        //         tags: [String],
        //         available: Boolean,
        //         score: Number,
        //         cost: Number,
        //         duration: Number,
        //     },
        // ],

    },
    {timestamps:true}
);

export default mongoose.model("Itinerary", itinerarySchema);