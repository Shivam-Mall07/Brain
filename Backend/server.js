import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import "dotenv/config";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

// app.post("/test", async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const response = await fetch(
//             "https://generativelanguage.googleapis.com/v1/interactions",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-goog-api-key": process.env.GEMINI_API_KEY
//                 },
//                 body: JSON.stringify({
//                     model: "gemini-3.6-flash",
//                     input: prompt
//                 })
//             }
//         );

//         const data = await response.json();

//         const answer = data.steps
//             ?.find(step => step.type === "model_output")
//             ?.content
//             ?.find(item => item.type === "text")
//             ?.text;

//         res.status(response.status).json({
//             answer
//         });

//     } catch (err) {
//         console.error(err);

//         res.status(500).json({
//             error: "Something went wrong"
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    connectDB(); 
});

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Databse!");
        
    }catch(err){
        console.log("Failed to connect with Db",err);
        
    }
}