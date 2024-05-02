import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // Import body-parser
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Add body-parser middleware

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_HACKATHON_KEY);

app.post("/gemini", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: req.body.history,
  });
  const msg = `${req.body.message} (Please answer using a list of tasks and format the to-do task items as follows. Add the word "tasklistitem:(importance-level)" before each to-do task. Also do not number them, the addition "tasklistitem:(importance-level)" is enough, don't make mistakes). Importance-level can either be high, medium or low. Pick on and put it in the bracket`;
  console.log(msg);

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  res.send(text);
  console.log(text);
});

app.get("/gemini-history", (req, res) => {
  // Send chat history as JSON response
  res.json({ history: [] });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
