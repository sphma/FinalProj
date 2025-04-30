const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions', // Ensure this is the correct URL
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error('Error from AI Model:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get response from AI model.' });
  }
});

module.exports = router;
