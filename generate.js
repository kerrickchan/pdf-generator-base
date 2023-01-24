const puppeteer = require('puppeteer');
const preview = require('./preview');

async function generate(html = preview(__dirname + '/template.html')) {
  const engine = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox'], // run with root
  });
  const [page] = await engine.pages()
  await page.setContent(html);
  await page.emulateMediaType('screen');

  const pdf = await page.pdf({ format: 'A4' });
  await engine.close();
  return pdf;
}

module.exports = generate;
