const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET route for messages
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
  console.log(`GET /api/message`);
});

// POST route for echoing messages
app.post('/api/echo', (req, res) => {
  const { message } = req.body; // Extract 'message' from the request body
  if (!message) {
    return res.status(400).json({ error: 'Message is required in the body' });
  }

  // Return the message back to the client
  res.json({ receivedMessage: message, reply: `You said: "${message}"` });
  console.log(`POST /api/echo - Received: ${message}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
