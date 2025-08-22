import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAhlnSLdKsTAc3-vQaro89hQ0tvG5wLKH0"; // 🔑 Thay bằng key thật
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userMsg }] }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server khi gọi Gemini API" });
  }
});

app.listen(3000, () => console.log("🚀 Server chạy tại http://localhost:3000"));
