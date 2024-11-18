const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.AZURE_MYSQL_HOST,
  user: process.env.AZURE_MYSQL_USER,
  password: process.env.AZURE_MYSQL_PASSWORD,
  database: process.env.AZURE_MYSQL_DATABASE,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

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

// POST route to save a message to the database
app.post('/api/save-message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required in the body' });
  }

  // Insert message into the database
  const query = 'INSERT INTO messages (message) VALUES (?)';
  db.query(query, [message], (err, result) => {
    if (err) {
      console.error('Error saving message to the database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ success: true, message: 'Message saved successfully!', id: result.insertId });
    console.log(`Message saved: ${message}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
