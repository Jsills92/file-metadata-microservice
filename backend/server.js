// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/file-metadata-microservice', express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>File Metadata</title></head>
      <body>
        <h1>Upload a File</h1>
        <form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
          <input type="file" name="upfile" />
          <input type="submit" value="Upload" />
        </form>
      </body>
    </html>
  `);
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file); // Log the file
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });
  
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
