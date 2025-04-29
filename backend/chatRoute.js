import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      process.env.DEEPSEEK_API_URL,
      {
        model: process.env.DEEPSEEK_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data.choices[0].message);
  } catch (err) {
    console.error('DeepSeek error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get AI response from DeepSeek.' });
  }
});

export default router;
