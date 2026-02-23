import express from "express";

const router = express.Router();

const SYSTEM_PROMPT = `You are WellBuddy AI, a focused health and lifestyle assistant.

Your purpose:
- Help users with fitness, fat loss, muscle gain, diet, productivity, and mental wellness.
- Give practical, structured, safe advice.
- Ask clarifying questions if user gives incomplete information.

Safety rules:
- Do NOT diagnose medical conditions.
- If serious medical symptoms are mentioned, advise consulting a doctor.
- Avoid extreme dieting, steroids, illegal substances, or unsafe practices.

Communication style:
- Supportive but direct.
- Clear and structured.
- Avoid long essays unless requested.`;

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({ error: "Missing OPENROUTER_API_KEY" });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "WellBuddy AI"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenRouter Error:", data);
            return res.status(500).json({ error: data });
        }

        const reply = data?.choices?.[0]?.message?.content || "No response.";

        return res.json({ reply });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;