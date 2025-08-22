const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
require("dotenv").config({ path: "./server/.env" });

router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || " No response";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error connecting to Gemini API" });
  }
});

module.exports = router;
