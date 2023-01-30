const template = require('lodash.template');
const { readFileSync } = require('fs');
const { transformTemplate, transformNull, transformDate, transformTime, transformInput, transformParagraph, transformDateTime, transformCharge, transformField } = require('./transform');

function preview(templateName, data) {
  if (!data) {
    data = JSON.parse(readFileSync(transformInput(templateName), { encoding: 'utf8' }))
  }

  const content = readFileSync(transformTemplate(templateName), { encoding: 'utf8', flag: 'r' });
  const merger = template(content);

  // transform for template, baggag-receipt
  if (data.dateTime) data.dateTime = transformDate(data.dateTime);
  if (data.address) data.address = transformParagraph(data.address);

  // transform for baggage-receipt
  if (data.checkInTs) data.checkInTs = transformDateTime(data.checkInTs);
  if (data.remarks) data.remarks = transformNull(data.remarks);

  // transform for invoice
  if (data.airportName) data.airportName = transformParagraph(data.airportName);
  if (data.shopName) data.shopName = transformParagraph(data.shopName);
  if (data.checkInTime) {
    data.checkInTimeDate = transformDate(data.checkInTime);
    data.checkInTimeTime = transformTime(data.checkInTime);
  }
  if (data.checkOutTime) {
    data.checkOutTimeDate = transformDate(data.checkOutTime);
    data.checkOutTimeTime = transformTime(data.checkOutTime);
  }
  if (data.paymentLockedOn) {
    data.paymentLockedOnDate = transformDate(data.paymentLockedOn);
    data.paymentLockedOnTime = transformTime(data.paymentLockedOn);
  }
  data = Object.fromEntries(
    Object.entries(data).map(([k, v]) => {
      if (
        k.includes('Amount') ||
        k === 'unitRate' ||
        k === 'discountAdjustment'
      ) {
        v = v.toFixed(2);
      }

      return [k, v];
    })
  );

  // transform for delivery-manifest
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

  // transform for acknowledgement
  if (data.signatureDate) data.signatureDate = transformDate(data.signatureDate);

  // transform for adjustment-form
  if (data.dateOfBagIn) data.dateOfBagIn = transformDate(data.dateOfBagIn);
  if (data.dateOfBagOut) data.dateOfBagOut = transformDate(data.dateOfBagOut);
  if (data.originalCharges) data.originalCharges = transformCharge(data.originalCharges);
  if (data.actualCharges) data.actualCharges = transformCharge(data.actualCharges);
  if ('waiveMinutes' in data) data.waiveMinutes = transformField(data.waiveMinutes, 3);
  if ('Other' in data) data.Other = transformField(data.Other, 34);
  if (data.customerDate) data.customerDate = transformDate(data.customerDate);
  if (data.handledDate) data.handledDate = transformDate(data.handledDate);
  if (data.approvedDate) data.approvedDate = transformDate(data.approvedDate);

  // transform for void-form
  if ('reason1' in data) {
    data.reason1 = true;
    data.reason2 = false;
    data.otherReason = transformField(data.otherReason, 34);
  }
  if ('reason2' in data) {
    data.reason1 = false;
    data.reason2 = true;
    data.otherReason = transformField(data.otherReason, 34);
  }
  if ('otherReason' in data) {
    data.reason1 = false;
    data.reason2 = false;
    data.otherReason = transformField(data.otherReason, 34);
  }


  return merger(data);
}

module.exports = preview;
