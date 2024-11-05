import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


const apiKey = process.env.OPENAI_API_KEY;
console.log('API Key:', apiKey);  

const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';


router.post('/chat', async (req, res) => {
    const { message } = req.body;
    console.log('Received message:', message);

    try {
        const response = await axios.post(
            openaiEndpoint,
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('API Response:', response.data);
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        if (error.response) {
            console.error('API Error Response:', error.response.status, error.response.statusText, error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('No response received from OpenAI:', error.request);
            res.status(500).json({ error: 'No response received from OpenAI' });
        } else {
            console.error('Error setting up the request:', error.message);
            res.status(500).json({ error: 'Error setting up the request' });
        }
    }
});

export default router;
