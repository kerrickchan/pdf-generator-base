const express = require('express');
const preview = require('./preview');
const generate = require('./generate');

const { PORT = 8080 } = process.env;
const app = express();
const defaultTemplate = 'template';

app.use(express.json());

const router = express.Router();
router.get('/:template', (req, res) => res.send(preview(req.params['template'] || defaultTemplate)));
router.post('/:template', (req, res) => {
  generate(preview(req.params['template'] || defaultTemplate, req.body))
    .then(data => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', data.length);
      res.send(data);
    })
    .catch(err => console.error(err));
})

app.use('/api/v1/pdf', router);

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
