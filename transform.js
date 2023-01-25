
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const { TZ = "Asia/Hong_Kong" } = process.env;

dayjs.extend(utc);
dayjs.extend(timezone);

function transformDateTime(dateTime) {
  return dayjs(dateTime).tz(TZ).format('DD/MM/YYYY');
}

module.exports = {
  transformDateTime,
}
