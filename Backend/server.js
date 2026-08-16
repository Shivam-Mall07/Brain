import express from "express";
import "dotenv/config";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post("/test", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1/interactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    model: "gemini-3.6-flash",
                    input: prompt
                })
            }
        );

        const data = await response.json();

        const answer = data.steps
            ?.find(step => step.type === "model_output")
            ?.content
            ?.find(item => item.type === "text")
            ?.text;

        res.status(response.status).json({
            answer
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});