curl -0 -Lo baggage-receipt.pdf -H "Content-Type: application/json" -d @../inputs/baggage-receipt/input.json -X POST http://localhost:8080/api/v1/pdf/baggage-receipt
