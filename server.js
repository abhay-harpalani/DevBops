const express = require('express');
const cors = require('cors');
// const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI with your API key
// const configuration = new Configuration({
//   apiKey: "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", // Ensure to set this in your environment variables
// });
// const openai = new OpenAIApi(configuration);

// import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log("userMessage", userMessage);
  try {
    // Generate a response using OpenAI's ChatGPT

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview", // Replace with your desired model
      messages: [{ role: "user", content: userMessage }]
    });
    // console.log("response", response["choices"][0].message.content);
    const reply = response["choices"][0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("Error in OpenAI response:", error);
    res.status(500).send("Error processing your request");
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(Server running on port ${PORT}));

