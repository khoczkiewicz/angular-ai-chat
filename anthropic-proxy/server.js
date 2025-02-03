require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());

app.post('/api/huggingface', async (req, res) => {
    try {
        const { message } = req.body;

        console.log('HF Token:', process.env.HF_API_TOKEN ? 'Exists' : 'Missing');

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            {
                inputs: message,
                parameters: {
                    max_length: 100,
                    temperature: 0.7
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HF_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const generatedText = response.data[0]?.generated_text || 'No response generated';
        res.json({ text: generatedText });

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to fetch response from Hugging Face API',
            details: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));