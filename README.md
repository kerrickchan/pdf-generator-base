# Setup Guide
```
npm install
```

# Job Description

## Requirements
- Develop a HTML page based on the requirement
- Write a node.js Express.js program to generate PDF using pdf.js or similar library which is compatible with node 18

## Expected Flow
```bash
$ PORT=8080 node pdf-generator.js &
$ curl -Lo output.pdf -X POST -H "Content-Type: application/json" -d @input.json http://localhost:8080
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
