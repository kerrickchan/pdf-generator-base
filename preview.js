const template = require('lodash.template');
const { readFileSync } = require('fs');
const { transformDateTime } = require('./transform');

function preview(templateFile, data = JSON.parse(readFileSync(__dirname + '/input.json', { encoding: 'utf8' }))) {
  const content = readFileSync(templateFile, { encoding: 'utf8', flag: 'r' });
  const merger = template(content);

  data.dateTime = transformDateTime(data.dateTime);
  return merger(data);
}

module.exports = preview;
