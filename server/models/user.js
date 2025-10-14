import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    clerkUserId:{type:String, requires: true, unique: true},
    name:{type: String, required:true},
    email:{type: String, required:true, unique: true},

});


export default mongoose.model('User', userSchema);