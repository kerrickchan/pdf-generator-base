const template = require('lodash.template');
const { readFileSync } = require('fs');
const { transformTemplate, transformDate, transformInput, transformParagraph, transformDuration, calcFee } = require('./transform');

function preview(templateName, data) {
  if (!data) {
    data = JSON.parse(readFileSync(transformInput(templateName), { encoding: 'utf8' }))
  }

  const content = readFileSync(transformTemplate(templateName), { encoding: 'utf8', flag: 'r' });
  const merger = template(content);

  // value check and transform
  data.dateTime ? data.dateTime = transformDate(data.dateTime) : null;
  data.address ? data.address = transformParagraph(data.address) : null;
  data.checkin ? data.checkin = transformDate(data.checkin) : null;
  !data.estimatedFee ? data.estimatedFee = calcFee(data?.hourDuration || 1) : null;
  data.hourDuration ? data.hourDuration = transformDuration(data.hourDuration) : null;

  return merger(data);
}

module.exports = preview;
