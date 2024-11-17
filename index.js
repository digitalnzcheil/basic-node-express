const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello!');
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
  console.log(`Server is running on http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});