import jwt from "jsonwebtoken";
const JWT_SECRET = "b3d295732996982741f112fb64a1b5e534ab369081f1d1bdad3342af74e6a95ec723df4964db7c4a417b21ec30dd09f792b5c15fb1433babd356360a7c84e7";


export const protect = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}