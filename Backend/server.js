import express from "express";
import "dotenv/config";
import cors from "cors";
import fetch from "node-fetch";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    
});

app.post("/test" , async (req, res) => {
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                 role: "user",
                 content: "Hello!"
                 }]
        })
    };

    try{

        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        console.log(data);
        res.send(data);
        
    }catch(err){
        console.log(err);
        
    }
})

// console.log(process.env.OPENAI_API_KEY);
