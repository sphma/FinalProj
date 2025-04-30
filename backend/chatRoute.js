const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct', // or try 'openai/gpt-3.5-turbo'
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://yourapp.com', // optional, but recommended
          'X-Title': 'OpashiBot Chat'
        }
      }
    );

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error('Error in /chat:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from AI model.' });
  }
});

module.exports = router;
