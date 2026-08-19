import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            model: "gemini-3.6-flash",
            input: message
        })
    };

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1/interactions",
            options
        );

        const data = await response.json();

        const answer = data.steps
            ?.find(step => step.type === "model_output")
            ?.content
            ?.find(item => item.type === "text")
            ?.text;

        return answer;

    } catch (err) {
        console.log(err);
    }
};

export default getGeminiAPIResponse;