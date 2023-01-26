const template = require('lodash.template');
const { readFileSync } = require('fs');
const { transformTemplate, transformDate, transformInput, transformParagraph, transformDuration, calcFee, transformDateTime } = require('./transform');

function preview(templateName, data) {
  if (!data) {
    data = JSON.parse(readFileSync(transformInput(templateName), { encoding: 'utf8' }))
  }

  const content = readFileSync(transformTemplate(templateName), { encoding: 'utf8', flag: 'r' });
  const merger = template(content);

  // transform for template, baggag-receipt
  if (data.dateTime) data.dateTime = transformDate(data.dateTime);
  if (data.address) data.address = transformParagraph(data.address);

  // transformed for baggage-receipt
  if (data.checkInTs) data.checkInTs = transformDateTime(data.checkInTs);
  if (!data.fee) data.fee = calcFee(data?.hourDuration || 1);

  // transformed for delivery-manifest
  if (data.date) data.date = transformDate(data.date);
  if (data.data && Array.isArray(data.data)) {
    data.data = data.data.map((v) => {
      if (v.registerDateTime) {
        v.registerDateTime = transformDateTime(v.registerDateTime);
      }

      return v;
    })
  }

  return merger(data);
}

module.exports = preview;
