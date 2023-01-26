const template = require('lodash.template');
const { readFileSync } = require('fs');
const { transformTemplate, transformDate, transformInput, transformParagraph, transformDuration, calcFee, transformDateTime } = require('./transform');

function preview(templateName, data) {
  if (!data) {
    data = JSON.parse(readFileSync(transformInput(templateName), { encoding: 'utf8' }))
  }

  const content = readFileSync(transformTemplate(templateName), { encoding: 'utf8', flag: 'r' });
  const merger = template(content);

  // value check and transform
  data.dateTime ? data.dateTime = transformDate(data.dateTime) : null;
  data.address ? data.address = transformParagraph(data.address) : null;
  data.checkInTs ? data.checkInTs = transformDateTime(data.checkInTs) : null;
  !data.fee ? data.fee = calcFee(data?.hourDuration || 1) : null;

  return merger(data);
}

module.exports = preview;
