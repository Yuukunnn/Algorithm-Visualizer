import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './chatCat.env' });

const app = express();
const port = process.env.CHATCAT_PORT || 4000;

// Extract the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Log the API key to ensure it is loaded correctly (for debugging purposes)
console.log('API Key:', apiKey);

app.use(cors());  // CORS middleware to handle cross-origin requests
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            process.env.CHATCAT_API_URL || 'https://api.openai.com/v1/chat/completions', // Updated endpoint for chat models
            {
                model: "gpt-3.5-turbo", // Using the chat model
                messages: [{ role: "user", content: userMessage }], // Adjusted to chat format
                max_tokens: 150 
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`, // Use the extracted API key
                    'Content-Type': 'application/json'
                }
            }
        );

        const botReply = response.data.choices[0].message.content.trim(); // Extract response from OpenAI
        res.json({ reply: botReply });
    } catch (error) {
        if (error.response) {
            console.error('Error communicating with OpenAI:', error.response.status, error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else {
            console.error('Error communicating with OpenAI:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(port, () => {
    console.log(`ChatCat server running on port ${port}`);
});
