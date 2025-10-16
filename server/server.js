import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const app = express();
app.use(cors());
app.use(express.json());

//mongodb connection
mongoose
    .connect("mongodb://127.0.0.1:27017/voyago")
    .then(() => console.log("Connected to mongodb"))
    .catch(err => console.log("Mongodb connection error:", err));

//user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// signup route 
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });
    await newUser.save();

    res.json({ message: "Signup successful" });

});

//login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ token });

});
app.listen(5000, () => console.log("Server running on  http://localhost:5000"));