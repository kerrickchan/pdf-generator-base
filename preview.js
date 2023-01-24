const { readFileSync } = require('fs');
const template = require('lodash.template');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { TZ = "Asia/Hong_Kong" } = process.env;

dayjs.extend(utc);
dayjs.extend(timezone);

function preview(templateFile, data = JSON.parse(readFileSync(__dirname + '/input.json', { encoding: 'utf8' }))) {
  const content = readFileSync(templateFile, { encoding: 'utf8', flag: 'r' });
  const merger = template(content);

  data.dateTime = dayjs(data.dateTime).tz(TZ).format('DD/MM/YYYY');
  return merger(data);
}

module.exports = preview;
