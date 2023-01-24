const puppeteer = require('puppeteer');
const preview = require('./preview');

async function generate(html = preview(__dirname + '/template.html')) {
  const engine = await puppeteer.launch();
  const [page] = await engine.pages()
  await page.setContent(html);

  const pdf = await page.pdf({ format: 'A4' });
  await engine.close();
  return pdf;
}

module.exports = generate;
