
# Setup Guide
## Install
### Chromium runtime engine
```bash
apt install chromium
```
### Node package
```bash
yarn install
```
### OS font For displaying Chinese characters
```bash
apt-get install -y fonts-indic fonts-noto fonts-noto-cjk
```

### Run All Tests Cases
The pdf with mapped name will be placed in the tests folder. same name in inputs folder will also be captured for testing
```bash
chmod -R 777 src/tests
cd src/tests
./all.sh
```

for example: invoices.sh will import inputs/invoice.json and export invoices.pdf

## FAQ
### Why get is empty
Please be reminded that add api routing path /api/v1/pdf/invoices

### PM2 could not find Chromium problem
1. find out pm2 cannot accept .env
2. chromium exec path maybe difference. which chromium and copy path to generate.js launch
3. pm2 cannot use with root. Resolved by add --no-sanbox args

## Run
### Curl
#### Start server
```bash
yarn start
```

#### Run Script
```bash
curl -0 -Lo output.pdf -H "Content-Type: application/json" -d @input.json -X POST http://localhost:8081/api/v1/pdf/templates
```

### API
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "customerName": "Chan Tai Man",
  "authorizedPerson": "John Doe",
  "passportId": "A1234567",
  "receiptNo": "123456",
  "dateTime": 1674550554469,
  "telephone": "(852) 9123 4567",
  "fax": "(852) 9123 4567",
  "email": "testing@cnr.ai",
  "address": "Address line1\nLine 2 UK",
  "openingHours": "0000-2359"
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8082", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

# Job Description

## Requirements
- Develop a HTML page based on the requirement
- Write a node.js Express.js program to generate PDF using pdf.js or similar library which is compatible with node 18

## Expected Flow
```bash
$ PORT=8080 node pdf-generator.js &
$ curl -Lo output.pdf -X POST -H "Content-Type: application/json" -d @input.json http://localhost:8081
$ open output.pdf
```
The above command will open the output.pdf using Apple's preview or Google Chrome.

**Input.json** contains 15-20 fields and most values are inserted into template.html and some values are for page formatting. Output PDF should only fit in one A4 page. No graphics design is required but a HTML page formatting is required. The text should be selectable in the PDF. The input.json, template HTML and output PDF contains Chinese characters. Developer are not required to know the characters. See attached the sample output.

## Deliverable
1. node.js program called `run.js`
2. `package.json`
3. `template.html` which contains the template of the HTML page
4. `template.css`
5. sample output PDF 
6. Other files

Code server will be provided for development.
