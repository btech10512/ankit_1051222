import dotenv from "dotenv";
import app from "./src/app.js";
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





