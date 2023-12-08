const express = require('express');
const multer = require('multer');
const { handleFileUpload, handleUserSearch, handleNotFound } = require('./src/route');

const app = express();
const PORT = 3000;

const upload = multer();

app.use(upload.single('file'));

app.post('/api/files', handleFileUpload);
app.get('/api/users', handleUserSearch);
app.use((req, res) => handleNotFound(res));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
