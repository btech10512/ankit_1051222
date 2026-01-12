import dotenv from "dotenv";
import express, { urlencoded } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import connectDB from "./src/config/db.js";
dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 4000;

connectDB()
    .then(() => {
        app.listen(PORT,() => {
            console.log(`Listening at http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("❌ MongoDB connection Error",error);
        process.exit(1)
    })
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    
}));





