
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const duration = require('dayjs/plugin/duration')

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

function transformTemplate(templateName) {
  return `${__dirname}/templates/${templateName}.html`;
}

function transformInput(inputName) {
  return `${__dirname}/inputs/${inputName}.json`;
}

function transformNull(value) {
  return value === null ? 'Nil' : value;
}

function transformDate(dateTime, TZ = "Asia/Hong_Kong") {
  return dayjs(dateTime).tz(TZ).format('DD/MM/YYYY');
}

function transformTime(dateTime, TZ = "Asia/Hong_Kong") {
  return dayjs(dateTime).tz(TZ).format('HH:mm');
}

function transformDateTime(dateTime, TZ = "Asia/Hong_Kong") {
  return dayjs(dateTime).tz(TZ).format('DD/MM/YYYY HH:mm');
}

function transformDuration(hourDuration) {
  const duration = dayjs.duration({ hours: hourDuration });
  return `${Math.floor(duration.hours() / 24)} Days ${duration.hours() % 24} Hours`;
}

function transformParagraph(valueAllowNewline = '') {
  return valueAllowNewline.replace(/\n/g, '<br>');
}

function transformField(value, count = 1, repeater = '_') {
  return value ? `<u>${value}</u>` : repeater.repeat(count);
}

function transformCharge(price) {
  return `${price['currency']} ${price['amount'].toFixed(2)}`;
}

function calcFee(hourDuration, bagNo = 1) {
  if (hourDuration > 11) return 140 * bagNo; // HKD
  
  return bagNo * hourDuration * 12;
}

module.exports = {
  transformTemplate,
  transformInput,
  transformNull,
  transformDate,
  transformTime,
  transformDateTime,
  transformDuration,
  transformParagraph,
  transformField,
  transformCharge,
  calcFee,
}
