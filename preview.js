const template = require('lodash.template');
const { readFileSync } = require('fs');
const { transformTemplate, transformDate, transformTime, transformInput, transformParagraph, transformDateTime } = require('./transform');

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

  // transformed for delivery-manifest
  if (data.date) data.date = transformDate(data.date);
  if (data.data && Array.isArray(data.data)) {
    const items = data.data.map((v) => {
      if (v.registerDateTime) {
        v.registerDate = transformDate(v.registerDateTime);
        v.registerTime = transformTime(v.registerDateTime);
      }

      v.remark = transformParagraph(v.remark);

      return v;
    })

    const itemFisrtPage = data.itemFisrtPage || 18;
    const itemPerPage = data.itemPerPage || 22;
    data.data = items.reduce((pages, item, index) => {
      const currentPage = index < itemFisrtPage ? 0 : 1 + Math.floor((index - itemFisrtPage) / itemPerPage);
      if (!pages[currentPage]) {
        pages[currentPage] = [];
      }

      pages[currentPage].push(item);
      return pages;
    }, [])
  }

  return merger(data);
}

module.exports = preview;
