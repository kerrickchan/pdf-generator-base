curl -0 -Lo invoices.pdf -H "Content-Type: application/json" -d @../inputs/invoices.json -X POST http://localhost:8080/api/v1/pdf/invoices
