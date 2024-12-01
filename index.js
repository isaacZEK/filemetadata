const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer
const upload = multer({ dest: 'uploads/' }); // Temporary file storage directory

// API endpoint for file analysis
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file; // Access the uploaded file
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond with file metadata in the required format
  res.json({
    name: file.originalname, // File's original name
    type: file.mimetype,     // MIME type of the file
    size: file.size,         // File size in bytes
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
