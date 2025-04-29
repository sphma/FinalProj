const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: messages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No reply";
    res.json({ content: reply });
  } catch (err) {
    console.error("DeepSeek error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || "Unknown error" });
  }
});

module.exports = router;
