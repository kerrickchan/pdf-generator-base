require('dotenv').config();
const express = require('express');
const preview = require('./preview');

const { PORT = 8080 } = process.env;
const app = express();
const templateFile = 'template.html';

app.use(express.json());

app.get('/', (req, res) => res.send(preview(templateFile)));
app.post('/', (req, res) => {
  res.send(preview(templateFile, req.body))
});
app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
