const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send('Hello!');
  console.log(`Server is running on http://localhost:${port}`);
});

// GET route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
  console.log(`GET /api/message`);
});

// POST route
app.post('/api/message', (req, res) => {
  const { message } = req.body; // Extract 'message' from the request body
  if (!message) {
    return res.status(400).json({ error: 'Message is required in the body' });
  }

  // Return the message back to the client
  res.json({ receivedMessage: message, reply: `You said: "${message}"` });
  console.log(`POST /api/message - Received: ${message}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
