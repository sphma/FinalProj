const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat', // or another model if specified
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content || "No response";
    res.json({ content: reply });
  } catch (err) {
    console.error('DeepSeek API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get response from DeepSeek API' });
  }
});

module.exports = router;
