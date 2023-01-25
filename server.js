const express = require('express');
const preview = require('./preview');
const generate = require('./generate');

const { PORT = 8080 } = process.env;
const app = express();
const defaultTemplate = 'prove';

app.use(express.json());

app.get('/', (req, res) => res.send(preview(req.query['template'] || defaultTemplate)));
app.post('/', (req, res) => {
  generate(preview(req.query['template'] || defaultTemplate, req.body))
    .then(data => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', data.length);
      res.send(data);
    })
    .catch(err => console.error(err));
})

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
