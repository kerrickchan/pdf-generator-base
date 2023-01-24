const { readFileSync } = require('fs');
const template = require('lodash.template');

function preview(templateFile, data = JSON.parse(readFileSync(__dirname + '/input.json', { encoding: 'utf8' }))) {
  const content = readFileSync(templateFile, { encoding: 'utf8', flag: 'r' });
  const merger = template(content);
  return merger(data);
}

module.exports = preview;
