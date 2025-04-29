import React, { useState } from 'react';
import axios from 'axios';

const ChatWindow = () => {
  const [messages, setMessages] = useState([{ role: "system", content: "Ask me anything!" }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
  
    setMessages(newMessages);
    setInput('');
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        messages: newMessages
      });
  
      const reply = response.data?.content || response.data?.choices?.[0]?.message?.content || "Sorry, no response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Need Help?</h1>
      <h2>Chat with OpashiBot</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'auto', backgroundColor: 'white' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}</p>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: '35px',
          marginTop: '8px',
          padding: '2px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          color: 'black'
        }}
      />
      <br />
      <button onClick={sendMessage} style={{ width: '15%', marginTop: '8px' }}>Send</button>
    </div>
  );
};

export default ChatWindow;
