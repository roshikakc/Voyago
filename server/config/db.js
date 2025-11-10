import mongoose from "mongoose";
import User from '../models/user.js';

const connectDB= async () => {
    try {
       const conn= await mongoose.connect(process.env.MONGO_URI);
       console.log(await User.find());
        console.log(`MongoDB connected: ${conn.connection.name}`);
        console.log(`Using database: ${conn.connection.db.databaseName}`);
    console.log(` Collections: ${Object.keys(conn.connection.collections)}`);
    }
    catch(error){
        console.log("MongoDB error:", error);
        process.exit(1);
    }
};

export default connectDB;