const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Basic MySQL connection pool. Adjust credentials as needed.
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bubble'
});

const app = express();
const port = 3000;

// Sample user data (for demonstration purposes)
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Check if the user exists
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Successful login
    return res.status(200).json({ message: 'Login successful.' });
  } else {
    // Failed login
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
});

// Get all videos
app.get('/videos', (req, res) => {
    pool.query('SELECT id, title, description FROM videos', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      return res.status(200).json(results);
    });
  });

  // Get all news articles
app.get('/news', (req, res) => {
    pool.query('SELECT * FROM news_articles', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      return res.status(200).json(results);
    });
  });
  
  // Get a specific news article by ID
  app.get('/news/:id', (req, res) => {
    const articleId = req.params.id;
    pool.query('SELECT * FROM news_articles WHERE id = ?', [articleId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Article not found.' });
      }
      return res.status(200).json(results[0]);
    });
  });
  
  // Add a new news article
  app.post('/news', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
  
    pool.query('INSERT INTO news_articles (title, content) VALUES (?, ?)', [title, content], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      return res.status(201).json({ message: 'Article added successfully.' });
    });
  });
  
  // Get a specific video by ID
  app.get('/videos/:id', (req, res) => {
    const videoId = req.params.id;
    pool.query('SELECT * FROM videos WHERE id = ?', [videoId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Video not found.' });
      }
      return res.status(200).json(results[0]);
    });
  });
  
  // Add a new video
  app.post('/videos', (req, res) => {
    const { title, description, videoPath } = req.body;
    if (!title || !description || !videoPath) {
      return res.status(400).json({ error: 'Title, description, and video path are required.' });
    }
  
    pool.query('INSERT INTO videos (title, description, video_path) VALUES (?, ?, ?)', [title, description, videoPath], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      return res.status(201).json({ message: 'Video added successfully.' });
    });
  });

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
